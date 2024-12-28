"use client";

import { useEffect, useState } from "react";
import { web3auth } from "@/lib/web3auth";

export default function Web3AuthComponent() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const initializeWeb3Auth = async () => {
      try {
        await web3auth.initModal();
      } catch (error) {
        console.error("Failed to initialize Web3Auth:", error);
      }
    };

    initializeWeb3Auth();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = await web3auth.connect();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout: any = async () => {
    try {
      await web3auth.logout();
      setAddress(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>
        {address ? `Connected: ${address}` : "Connect Wallet"}
      </button>
      {address && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
