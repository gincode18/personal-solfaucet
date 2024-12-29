
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import ShinyButton from "@/components/ui/shiny-button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Input } from "@/components/ui/number-input";
import { useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Balance } from "./Balance";

export default function Home() {
  const [value, setValue] = useState(0)
  const [PublicKey, setPublicKey] = useState("")

  const placeholders = ["Enter you public-key", "Don't enter your private-key", "To airdrop SOL to Devnet || Testnet"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 m-auto"
      >
        <div className=" flex justify-center items-center gap-4">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          🌞💦Sol Faucet💦🌞
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          With the click of a button, fund your testnet or devnet wallet and
          join the fun in the SOL!
        </div>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <div className=" flex flex-col justify-center items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-4">
            <Input value={value} onChange={setValue} min={0} max={10} />
            <p className="text-sm text-zinc-500">Min: 0, Max: 10</p>
            <ShinyButton>Devnet</ShinyButton>
            <ShinyButton>Testnet</ShinyButton>
          </div>
          <Balance></Balance>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
