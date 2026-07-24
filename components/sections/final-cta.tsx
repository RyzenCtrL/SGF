"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";
import { FloatingPathsBackground } from "@/components/ui/floating-paths";
import { FormProgressBar } from "@/components/ui/form-progress-bar";
import { FormSuccess } from "@/components/ui/form-success";
import { siteConfig } from "@/lib/site-config";

const afterSubmitSteps = [
  "Перезвоним в течение 30 минут в рабочее время",
  "Уточним площадку, бюджет и сроки",
  "Пришлём расчёт и предварительную визуализацию",
];

export function FinalCta() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isNameValid = name.trim().length >= 2;
  const isPhoneComplete = phone.replace(/\D/g, "").replace(/^7/, "").length === 10;
  const completedCount = [isNameValid, isPhoneComplete].filter(Boolean).length;

  return (
    <section id="form" className="relative overflow-hidden bg-bg-secondary py-section-mobile md:py-section-inner lg:py-section-desktop">
      <FloatingPathsBackground />

      <div className="relative mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <SectionKicker>Заявка на расчёт</SectionKicker>
            <h2 className="text-h2 font-heading text-text-primary">
              Получите расчёт проекта за 1 день
            </h2>
            <p className="text-body text-text-secondary">
              Расскажите о задаче — инженер свяжется с вами и подготовит предварительный расчёт
              бесплатно, без обязательств.
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <span className="text-caption uppercase tracking-wide text-text-secondary">
                Что будет после отправки
              </span>
              <div className="relative flex flex-col gap-5">
                <div className="absolute bottom-3 left-3.5 top-3 w-px bg-accent-lime/15" />
                {afterSubmitSteps.map((step, i) => (
                  <div key={step} className="relative flex items-start gap-3">
                    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-lime/30 bg-bg-secondary font-heading text-xs text-accent-lime">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm text-text-secondary">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button href={siteConfig.whatsapp} variant="secondary" showArrow={false} className="h-12 gap-2 px-5">
                <MessageCircle size={16} />
                WhatsApp
              </Button>
              <Button href={siteConfig.telegram} variant="secondary" showArrow={false} className="h-12 gap-2 px-5">
                <Send size={16} />
                Telegram
              </Button>
            </div>
          </Reveal>

          <Reveal className="rounded-card border border-stroke-subtle bg-bg-card/95 p-6 backdrop-blur md:p-8">
            {submitted ? (
              <FormSuccess name={name} phone={phone} />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let hasError = false;
                  if (!isNameValid) {
                    setNameError("Введите имя");
                    hasError = true;
                  }
                  if (!isPhoneComplete) {
                    setPhoneError("Введите номер телефона полностью");
                    hasError = true;
                  }
                  if (hasError) return;
                  setNameError(null);
                  setPhoneError(null);
                  setSubmitted(true);
                }}
                className="flex flex-col gap-5"
              >
                <FormProgressBar completed={completedCount} total={2} />
                <Input
                  label="Имя"
                  name="name"
                  placeholder="Как к вам обращаться"
                  required
                  value={name}
                  error={nameError ?? undefined}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                />
                <PhoneInput
                  label="Телефон"
                  required
                  error={phoneError ?? undefined}
                  onValueChange={(value) => {
                    setPhone(value);
                    if (phoneError) setPhoneError(null);
                  }}
                />
                <Textarea
                  label="Комментарий"
                  name="comment"
                  placeholder="Площадка, сроки, пожелания — необязательно"
                />
                <Button type="submit" variant="primary" className="w-full">
                  Получить расчёт проекта
                </Button>
                <p className="text-xs text-text-tertiary">
                  Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
