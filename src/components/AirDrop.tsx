import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useToast } from "@/hooks/use-toast";
import ShinyButton from "./ui/shiny-button";
import confetti from "canvas-confetti";

type props = {
  amount: number
}

export function RequestAirdrop({ amount }: props) {
  const { toast } = useToast()
  const wallet = useWallet();
  const { connection } = useConnection();

  async function requestAirdrop() {
    if (!wallet.publicKey) {
      toast({
        title: "Error",
        description: "Wallet is not connected.",
      });

      return;
    }

    try {
      await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
      toast({
        title: "Airdrop SucessFull",
        description: `Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`,
      });
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    } catch (error) {
      console.error("Failed to request airdrop:", error);
      toast({
        title: "Error",
        description: "Airdrop failed. Please try again later.",
      });

    }
  }

  return (
    <div>
      <ShinyButton onClick={requestAirdrop}>Airdrop</ShinyButton>
    </div>
  );
}
