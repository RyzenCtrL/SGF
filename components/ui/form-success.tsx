"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EASE_SMOOTH } from "@/lib/motion";

interface FormSuccessProps {
  name?: string;
  phone?: string;
  description?: string;
}

export function FormSuccess({
  name,
  phone,
  description = "Мы свяжемся с вами в течение 30 минут в рабочее время.",
}: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-full flex-col items-center justify-center gap-5 py-10 text-center"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.15 }}
          className="absolute inset-0 rounded-full border border-accent-lime/50"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.05 }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-lime/30 bg-accent-lime/10 shadow-[0_0_32px_-4px_rgba(181,224,36,0.5)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, duration: 0.35, ease: "backOut" }}
          >
            <Check className="text-accent-lime" size={28} strokeWidth={2.25} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: EASE_SMOOTH }}
        className="flex flex-col gap-2"
      >
        <p className="text-h3 font-heading text-text-primary">Заявка отправлена</p>
        <p className="max-w-[320px] text-sm text-text-secondary">{description}</p>
      </motion.div>

      {(name || phone) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4, ease: EASE_SMOOTH }}
          className="flex w-full max-w-[280px] flex-col gap-2 rounded-control border border-stroke-subtle bg-bg-secondary/60 p-4 text-left"
        >
          {name && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-text-tertiary">Имя</span>
              <span className="text-sm font-medium text-text-primary">{name}</span>
            </div>
          )}
          {phone && (
            <div
              className={
                name
                  ? "flex items-center justify-between gap-3 border-t border-stroke-subtle pt-2"
                  : "flex items-center justify-between gap-3"
              }
            >
              <span className="text-xs text-text-tertiary">Телефон</span>
              <span className="text-sm font-medium tabular-nums text-text-primary">{phone}</span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
