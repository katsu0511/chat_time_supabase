import { Language, Languages } from '@/lib/domain/languages';

export default function Option({ language }: { language: Language }) {
  return <option value={language}>{Languages[language]}</option>;
}
