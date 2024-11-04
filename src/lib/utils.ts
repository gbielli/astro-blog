import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string | undefined): string {
  // Gérer le cas où le texte est undefined ou null
  if (!text) {
    return "";
  }

  return text
    .toString() // Convertir en string
    .normalize("NFD") // Normaliser les caractères Unicode
    .replace(/[\u0300-\u036f]/g, "") // Retirer les accents
    .toLowerCase() // Convertir en minuscules
    .trim() // Retirer les espaces au début et à la fin
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/[^\w-]+/g, "") // Retirer les caractères non-word
    .replace(/--+/g, "-") // Remplacer les multiples tirets par un seul
    .replace(/^-+/, "") // Retirer les tirets au début
    .replace(/-+$/, ""); // Retirer les tirets à la fin
}
