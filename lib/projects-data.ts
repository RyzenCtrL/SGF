import type { Project } from "./types";

// TODO: заменить на реальные кейсы, фото объектов и метрики
export const projectCategories = ["ЖК", "Школы", "Парки", "Коммерция"] as const;

const unsplash = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

export const projects: Project[] = [
  {
    slug: "zhk-severnyi-2024",
    category: "ЖК",
    title: "Воркаут-зона ЖК «Северный»",
    city: "Москва",
    year: 2024,
    metrics: ["320 м²", "14 станций", "18 дней монтаж"],
    image: "/images/projects/project2-1024x683.webp",
  },
  {
    slug: "zhk-rechnoy-kvartal",
    category: "ЖК",
    title: "Спортплощадка ЖК «Речной квартал»",
    city: "Казань",
    year: 2023,
    metrics: ["210 м²", "9 станций", "12 дней монтаж"],
    image: "/images/projects/project3-1024x683.webp",
  },
  {
    slug: "shkola-1520",
    category: "Школы",
    title: "Спортивный комплекс школы №1520",
    city: "Москва",
    year: 2024,
    metrics: ["450 м²", "нормы ГТО", "20 дней монтаж"],
    image: "/images/projects/project6-1024x683.webp",
  },
  {
    slug: "park-pobedy-vorkaut",
    category: "Парки",
    title: "Воркаут-кластер в парке Победы",
    city: "Нижний Новгород",
    year: 2023,
    metrics: ["600 м²", "22 станции", "25 дней монтаж"],
    image: unsplash("photo-1517836357463-d25dfeac3438"),
  },
  {
    slug: "zhk-yantarny-bereg",
    category: "ЖК",
    title: "Детско-спортивный кластер ЖК «Янтарный берег»",
    city: "Калининград",
    year: 2022,
    metrics: ["280 м²", "11 станций", "15 дней монтаж"],
    image: unsplash("photo-1534438327276-14e5300c3a48"),
  },
  {
    slug: "shkola-gimnazia-15",
    category: "Школы",
    title: "Пришкольная площадка гимназии №15",
    city: "Екатеринбург",
    year: 2023,
    metrics: ["380 м²", "нормы ГТО", "17 дней монтаж"],
    image: unsplash("photo-1779449607469-c8f06cdf59f9"),
  },
  {
    slug: "park-naberezhnaya",
    category: "Парки",
    title: "Спортивная набережная",
    city: "Самара",
    year: 2022,
    metrics: ["750 м²", "28 станций", "30 дней монтаж"],
    image: unsplash("photo-1571008887538-b36bb32f4571"),
  },
  {
    slug: "biznes-park-sokol",
    category: "Коммерция",
    title: "Корпоративная зона отдыха «Бизнес-парк Сокол»",
    city: "Москва",
    year: 2024,
    metrics: ["150 м²", "8 станций", "10 дней монтаж"],
    image: unsplash("photo-1571731956672-f2b94d7dd0cb"),
  },
  {
    slug: "fitness-hub-tyumen",
    category: "Коммерция",
    title: "Открытая зона фитнес-клуба",
    city: "Тюмень",
    year: 2023,
    metrics: ["190 м²", "10 станций", "14 дней монтаж"],
    image: unsplash("photo-1571019613454-1cb2f99b2d8b"),
  },
];

export function getProjectsByCategory(category: string) {
  if (category === "Все") return projects;
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getSimilarProjects(project: Project, limit = 3) {
  return projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, limit);
}
