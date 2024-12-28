import { App } from '@octokit/app'
import { Octokit } from '@octokit/rest'

const githubApp = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
})
