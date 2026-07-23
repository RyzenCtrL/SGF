import type { LucideIcon } from "lucide-react";

export interface Product {
  slug: string;
  category: string;
  name: string;
  priceFrom: number;
  specs: [string, string];
  image: string;
  description?: string;
  highlight?: string;
  ratings?: { label: string; value: number }[];
  extraSpecs?: { icon: LucideIcon; label: string; value: string }[];
}

export interface Project {
  slug: string;
  category: string;
  title: string;
  city: string;
  year: number;
  metrics: [string, string, string];
  image: string;
  description?: string;
}
