// app/components/InstallGitHubApp.tsx
export default function InstallGitHubApp() {
    const GITHUB_APP_URL = `https://github.com/apps/staked-habit-edu-chain/installations/new`
    
    return (
      <a 
        href={GITHUB_APP_URL}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Install GitHub App
      </a>
    )
  }