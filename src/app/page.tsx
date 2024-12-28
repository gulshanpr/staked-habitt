// import ConnectButton from '@/components/ConnectButton';

// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to Web3Modal with Wagmi</h1>
//       <ConnectButton />
//     </div>
//   );
// }

"use client"
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const AuthPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to get session on component mount
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
      } else {
        setUser(session?.user);  // Set user from session data
      }
    };

    getSession();
  }, []);

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) console.error(error);
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
    </div>
  );
};

export default AuthPage;
