"use client";

import "./card-shine.css";

interface CardShineProps {
  metalness?: number;
}

// "Стеклянно-металлический" фон карточки: градиент-поверхность + статичный
// диагональный блик, который слегка сдвигается при hover (через .group:hover
// — hover уже вешается на карточку-хозяина). Без отдельной градиентной рамки
// (у карточки уже есть своя обычная border) и без зерна — карточка чище.
export function CardShine({ metalness = 0.5 }: CardShineProps) {
  const style = {
    "--cs-metalness": metalness,
  } as React.CSSProperties;

  return (
    <div className="card-shine" style={style} aria-hidden>
      <div className="card-shine-surface" />
      <div className="card-shine-sheen" />
    </div>
  );
}
