"use client"
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import InstallGitHubApp from '@/components/InstallGitHubApp';

const AuthPage = () => {
  // Type the state for user as either 'null' or a user object type (you can define 'User' type as needed)
  const [user, setUser] = useState<any | null>(null); // Change 'any' to the correct type if you have it

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
      } else {
        setUser(session?.user || null);  // Set 'null' if no user
        // Get the access token provided by Supabase (which will have read-only access to GitHub)
        const accessToken = session?.provider_token; // This is the GitHub access token
        if (accessToken) {
          fetchGitHubData(accessToken); // Fetch data after authentication
        }
      }
    };
  
    getSession();
  }, []);

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        scopes: 'repo:read user:email',  // Only request read access
      },
    });
    if (error) console.error('GitHub authentication error:', error);
  };

  const fetchGitHubData = async (accessToken: string) => {
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
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear the user state after sign out
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGitHub}>Sign In with GitHub</button>
      )}

      <div>
        <InstallGitHubApp/>
      </div>
    </div>
  )
}