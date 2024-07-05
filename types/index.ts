import type { ParsedContent } from "@nuxt/content";

export type HomePageContent = ParsedContent & {
  actionText: string;
  actionUrl: string;
};
