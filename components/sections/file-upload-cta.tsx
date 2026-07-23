"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Phone, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { EASE_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "photo", label: "Фото участка", icon: Camera },
  { key: "phone", label: "Номер телефона", icon: Phone },
  { key: "sent", label: "Заявка отправлена", icon: Send },
];

function StepTracker({ completed }: { completed: boolean[] }) {
  const activeIndex = completed.filter(Boolean).length;
  const progress = Math.min(1, activeIndex / (STEPS.length - 1));

  return (
    <div className="relative">
      <div className="absolute left-[18px] right-[18px] top-[18px] h-px bg-stroke-subtle" />
      <motion.div
        className="absolute left-[18px] top-[18px] h-px origin-left bg-accent-lime"
        style={{ width: "calc(100% - 36px)" }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      />

      <div className="relative flex justify-between">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border bg-bg-card transition-colors duration-500 ease-smooth",
                completed[i]
                  ? "border-accent-lime bg-accent-lime/15 text-accent-lime"
                  : "border-stroke-subtle text-text-tertiary"
              )}
            >
              {completed[i] ? <Check size={16} /> : <step.icon size={16} strokeWidth={1.75} />}
            </div>
            <span
              className={cn(
                "max-w-[90px] text-center text-xs leading-tight",
                completed[i] ? "text-text-primary" : "text-text-tertiary"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FileUploadCta() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [phone, setPhone] = useState("+7");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isPhoneComplete = phone.replace(/\D/g, "").replace(/^7/, "").length === 10;
  const completed = [Boolean(fileName), isPhoneComplete, submitted];

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-card border border-accent-lime/30 bg-bg-card/60 p-10 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md md:p-12">
        <GrainOverlay />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <StepTracker completed={[true, true, true]} />
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-lime/30 bg-accent-lime/10 shadow-[0_0_28px_-4px_rgba(181,224,36,0.45)]">
            <Check className="text-accent-lime" size={26} />
          </div>
          <p className="max-w-[440px] text-body-lg text-text-primary">
            Заявка принята. Инженер посмотрит фото участка и свяжется с вами в течение рабочего
            дня.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isPhoneComplete) {
          setPhoneError("Введите номер телефона полностью");
          return;
        }
        setPhoneError(null);
        setSubmitted(true);
      }}
      className="relative overflow-hidden rounded-card border border-stroke-subtle bg-bg-card/60 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md md:p-10"
    >
      <GrainOverlay />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10">
            <Camera size={24} className="text-accent-lime" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-h3 font-heading text-text-primary">
              Пришлите фото участка — предложим решение
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Инженер оценит площадку и подберёт комплектацию ещё до выезда на замер.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px] md:mx-0">
          <StepTracker completed={completed} />
        </div>

        <div className="flex flex-col gap-4 border-t border-stroke-subtle pt-6 md:flex-row md:items-end">
          <label className="flex h-14 flex-1 cursor-pointer items-center gap-3 rounded-control border border-dashed border-stroke-subtle px-4 text-sm text-text-secondary transition-colors duration-300 ease-smooth hover:border-accent-lime">
            <Camera size={18} />
            <span className="truncate">{fileName ?? "Прикрепить фото (по желанию)"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
          <div className="md:w-[220px]">
            <PhoneInput
              label="Телефон"
              required
              error={phoneError ?? undefined}
              onValueChange={(value) => {
                setPhone(value);
                if (phoneError) setPhoneError(null);
              }}
            />
          </div>
          <Button type="submit" variant="primary" className="md:w-auto md:px-8">
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
}
