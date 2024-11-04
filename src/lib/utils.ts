import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string | undefined | null): string {
  if (!text) {
    console.warn("Tentative de slugify avec une valeur invalide:", text);
    return "uncategorized";
  }

  try {
    const slug = text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/--+/g, "-");

    return slug || "uncategorized";
  } catch (error) {
    console.error("Erreur dans slugify pour:", text, error);
    return "uncategorized";
  }
}
