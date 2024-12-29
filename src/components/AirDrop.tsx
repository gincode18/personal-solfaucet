import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useToast } from "@/hooks/use-toast";
import ShinyButton from "./ui/shiny-button";

type props={
    amount:number
  }

export function RequestAirdrop({amount}:props) {
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
     <ShinyButton onClick={requestAirdrop}>DevNet</ShinyButton> 
    </div>
  );
}
