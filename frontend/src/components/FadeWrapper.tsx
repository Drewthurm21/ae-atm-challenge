import { ReactNode } from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function FadeWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.div>
  );
}
