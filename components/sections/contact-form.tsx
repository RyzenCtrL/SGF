"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormProgressBar } from "@/components/ui/form-progress-bar";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isNameValid = name.trim().length >= 2;
  const isPhoneComplete = phone.replace(/\D/g, "").replace(/^7/, "").length === 10;
  const completedCount = [isNameValid, isPhoneComplete].filter(Boolean).length;

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
        <Check className="text-accent-lime" size={32} />
        <p className="text-h3 font-heading text-text-primary">Заявка отправлена</p>
        <p className="text-sm text-text-secondary">
          Мы свяжемся с вами в течение 30 минут в рабочее время.
        </p>
      </div>
    );
  }

  return (
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
      <span className="text-h3 font-heading text-text-primary">Заявка на расчёт проекта</span>
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
      <Textarea label="Комментарий" name="comment" placeholder="Площадка, сроки, пожелания — необязательно" />
      <Button type="submit" variant="primary" className="w-full">
        Получить расчёт проекта
      </Button>
      <p className="text-xs text-text-tertiary">
        Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.
      </p>
    </form>
  );
}
