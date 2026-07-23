// Единственный источник правды для цифр и реквизитов компании.
// TODO: заменить плейсхолдеры на реальные данные перед запуском.
export const siteConfig = {
  name: "Street Gym Factory",
  legalName: 'ООО «Стрит Джим Фактори»', // TODO: реальное юрлицо
  domain: "street-gym-factory.ru",
  phone: "+7 (900) 000-00-00", // TODO: реальный телефон
  phoneHref: "tel:+79000000000",
  email: "info@street-gym-factory.ru", // TODO: реальная почта
  whatsapp: "https://wa.me/79000000000",
  telegram: "https://t.me/streetgymfactory",
  inn: "0000000000", // TODO: реальный ИНН
  ogrn: "0000000000000", // TODO: реальный ОГРН
  address: "г. Москва, промзона", // TODO: реальный адрес завода
  stats: {
    yearsOnMarket: 12,
    objectsBuilt: 120,
    regions: 27,
    warrantyYears: 5,
    installDays: 30,
  },
} as const;
