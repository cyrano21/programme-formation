import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Déclaration de type pour tailwind-merge
declare module "tailwind-merge" {
  export function twMerge(...classes: string[]): string
}

/**
 * Combines multiple Tailwind CSS class names into a single string.
 * 
 * @param inputs - A variable number of class names to combine.
 * @returns A single string containing all the combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
