// app/api/webhook/route.ts
import { NextResponse } from 'next/server'
import { App } from '@octokit/app'
import { Octokit } from '@octokit/rest'

const githubApp = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
})

async function getInstallationOctokit(installationId: number) {
  const installation = await githubApp.getInstallationOctokit(installationId)
  return installation
}

export async function POST(req: Request) {
  try {
    const payload = await req.json()
    
    // Skip if not a push event
    if (!payload.commits) {
      console.log('Not a push event, skipping...')
      return new NextResponse('OK')
    }

    // Get installation-specific client
    const installationId = payload.installation.id
    const octokit = await getInstallationOctokit(installationId)

    // Process each commit
    for (const commit of payload.commits) {
      // Get detailed commit info
      const { data: commitData } = await octokit.repos.getCommit({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        ref: commit.id
      })

      // Log the data
      console.log({
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
    console.error('Webhook error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}