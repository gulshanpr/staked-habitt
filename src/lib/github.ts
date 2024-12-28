export async function fetchGitHubData(accessToken: string) {
    try {
      // Fetch user repositories (read-only access)
      const reposResponse = await fetch('https://api.github.com/user/repos?type=all', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const repos = await reposResponse.json();
      
      console.log('User Repositories:', repos);
  
      // Fetch commits for each repository (read-only access)
      for (const repo of repos) {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const commits = await commitsResponse.json();
        console.log('Commits for repository:', repo.name, commits);
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  }