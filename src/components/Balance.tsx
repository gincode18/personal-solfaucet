import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

export function Balance() {
  const { connection } = useConnection();
  const wallet = useWallet();

  async function getBalance() {
    if (wallet.publicKey) {
      try {
        const balance = await connection.getBalance(wallet.publicKey);
        const balanceElement = document.getElementById("balance");
        if (balanceElement) {
          balanceElement.innerHTML = "Balance : " + (balance / LAMPORTS_PER_SOL).toFixed(2) + " SOL";
        }
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    } else {
      console.warn("Wallet is not connected.");
    }
  }

  // Fetch balance when the component is rendered
  useEffect(() => {
    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <div>
        <span
          id="balance"
          className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
        >
         Balance : 0.00 SOL
        </span>
      </div>
    </NeonGradientCard>
  );
}