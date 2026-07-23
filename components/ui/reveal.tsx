"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  stagger?: boolean;
}

export function Reveal({ children, stagger, className, ...props }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger ? staggerContainer : fadeUp}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}
