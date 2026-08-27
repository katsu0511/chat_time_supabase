import generateText from '@/lib/infrastructure/ai';

export default async function translateMessage(targetLanguage: string, message: string) {
  return generateText(`
    Translate the following message into ${targetLanguage}.
    Return only the translated text.

    Message: ${message}
  `);
}
