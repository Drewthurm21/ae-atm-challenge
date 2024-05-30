import { ReactNode } from "react";
import { motion } from "framer-motion";
import Splashpage from "./Splashpage";
import { FaPhone } from "react-icons/fa6";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <Splashpage>
      <motion.div className="flex flex-col h-screen">
        <nav className="flex w-full justify-between bg-gradient-to-b from-slate-900 to-black text-zinc-50 p-4">
          <motion.div className="w-1/3 h-20 bg-ae-logo bg-no-repeat text-xl font-bold" />
          <motion.div className="flex gap-4 items-center mr-8">
            {" "}
            <FaPhone className="text-accent" />
            <span className="">866.363.9595</span>
          </motion.div>
        </nav>
        <main className="p-8 fixed inset-0 grid place-items-center overflow-y-scroll">
          {children}
        </main>
      </motion.div>
    </Splashpage>
  );
}
