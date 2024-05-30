import { useRef } from "react";
import { motion } from "framer-motion";
import AppearingText from "./AppearingText";

export default function MessagingHeaders() {
  const messageRef = useRef<string[]>(messaging[Math.floor(Math.random() * 5)]);

  return (
    <>
      <AppearingText
        words={messageRef.current[0]}
        className="text-3xl bold -translate-y-4 -translate-x-8"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AppearingText
          words={messageRef.current[1]}
          className="text-2xl bold -translate-y-4 translate-x-8"
        />
      </motion.div>
    </>
  );
}

const messaging = [
  ["Need a loan?", "We're here for you."],
  ["Looking to invest?", "Let us guide you."],
  ["Trying to save?", "Let's make a plan."],
  ["Want financial advice?", "You can count on us."],
  ["Building credit?", "We can support you."],
];
