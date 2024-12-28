// app/api/webhook/route.ts
import { NextResponse } from 'next/server'
import { App } from '@octokit/app'
import { Octokit } from '@octokit/rest'

const githubApp = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
})

export async function POST(req: Request) {
  try {
    // Log the entire request
    console.log('Webhook received!')
    console.log('Headers:', Object.fromEntries(req.headers))
    
    const payload = await req.json()
    console.log('Raw payload:', JSON.stringify(payload, null, 2))

    // Check if it's a push event
    if (!payload.commits) {
      console.log('Not a push event, event type:', req.headers.get('x-github-event'))
      return new NextResponse('Not a push event')
    }

    console.log('Installation ID:', payload.installation?.id)

    try {
      // Get installation-specific client
      const octokit = await githubApp.getInstallationOctokit(payload.installation.id)
      console.log('Successfully got installation Octokit')

      // Process each commit
      for (const commit of payload.commits) {
        console.log('Processing commit:', commit.id)
        
        // Get detailed commit info
        const { data: commitData } = await octokit.repos.getCommit({
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          ref: commit.id
        })

        console.log('Commit Data:', {
          commit: {
            id: commit.id,
            message: commit.message,
            author: commit.author.username,
            timestamp: commit.timestamp
          },
          stats: {
            additions: commitData.stats?.additions || 0,
            deletions: commitData.stats?.deletions || 0,
            total_files: commitData.files?.length || 0
          },
          repository: {
            name: payload.repository.full_name,
            branch: payload.ref.replace('refs/heads/', '')
          }
        })
      }

      return new NextResponse('OK')
    } catch (error) {
      console.error('Error processing with Octokit:', error)
      return new NextResponse('Error processing with Octokit', { status: 500 })
    }
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}