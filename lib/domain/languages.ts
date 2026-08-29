export const Languages = {
  en: 'English',
  ja: 'Japanese',
  th: 'Thai',
} as const;

export type Language = keyof typeof Languages;
