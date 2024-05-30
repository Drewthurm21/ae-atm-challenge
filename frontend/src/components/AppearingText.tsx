import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function AppearingText({
  words,
  className,
}: {
  words: string;
  className: string;
}) {
  const [scope, animate] = useAnimate();

  const chars = words.replace(/\s/g, "•").split("");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 1,
        delay: stagger(0.02),
      }
    );
  }, [scope.current]);

  const buildContent = () => (
    <motion.div ref={scope}>
      {words &&
        chars.map((c, index) => (
          <motion.span
            key={"char# " + index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={className}
          >
            {c === "•" ? " " : c}
          </motion.span>
        ))}
    </motion.div>
  );

  return (
    <motion.div className={twMerge("font-bold", className)}>
      <div className="mt-4">
        <div className="text-2xl leading-snug tracking-wide">
          {buildContent()}
        </div>
      </div>
    </motion.div>
  );
}
