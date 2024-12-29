
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Input } from "@/components/ui/number-input";
import { useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Balance } from "./Balance";
import { RequestAirdrop } from "./AirDrop";
import { GooeyText } from "./ui/gooey-text-morphing";

export default function Home() {
  const [value, setValue] = useState(0)

  const placeholders = ["Connect your", "Wallet to","AirDrop SOL"];

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
        <div className="h-[200px] flex items-center justify-center">
          <GooeyText
            texts={placeholders}
            morphTime={1}
            cooldownTime={0.25}
            className="font-bold"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex flex-row justify-center items-center gap-4">
            <Input value={value} onChange={setValue} min={0} max={10} />
            <p className="text-sm text-zinc-500">Min: 0, Max: 10</p>
            <RequestAirdrop amount={value}></RequestAirdrop>
          </div>
          <Balance></Balance>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
