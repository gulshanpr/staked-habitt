"use client"

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import InstallGitHubApp from '../InstallGitHubApp';
import { fetchGitHubData } from '../../lib/github';

export function GitHubAuth() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
      } else {
        setUser(session?.user || null);
        const accessToken = session?.provider_token;
        if (accessToken) {
          await fetchGitHubData(accessToken);
        }
      }
    };
  
    getSession();
  }, []);

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        scopes: 'repo:read user:email',
      },
    });
    if (error) console.error('GitHub authentication error:', error);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-700">Welcome, {user.email}</p>
          <button 
            onClick={signOut}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button 
          onClick={signInWithGitHub}
          className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          Sign In with GitHub
        </button>
      )}

      <InstallGitHubApp />
    </div>
  );
}