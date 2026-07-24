"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormProgressBar } from "@/components/ui/form-progress-bar";
import { FormSuccess } from "@/components/ui/form-success";

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
    return <FormSuccess name={name} phone={phone} />;
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
