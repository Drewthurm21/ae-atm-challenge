import { ReactNode } from "react";
import { motion } from "framer-motion";
import Splashpage from "./Splashpage";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <Splashpage>
      <motion.div className="flex flex-col h-screen">
        <nav className="flex w-full justify-between bg-gradient-to-b from-slate-900 to-black text-zinc-50 p-4">
          <motion.div className="w-1/3 h-24 bg-ae-logo bg-no-repeat text-xl font-bold" />
          <motion.div>866.363.9595</motion.div>
        </nav>
        <main className="p-8 fixed inset-0 grid place-items-center overflow-y-scroll cursor-pointer">
          {children}
        </main>
      </motion.div>
    </Splashpage>
  );
}
