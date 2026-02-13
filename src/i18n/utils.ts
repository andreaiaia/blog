import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: string) {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getAlternateLanguage(currentLang: string) {
  return currentLang === 'it' ? 'en' : 'it';
}

export function getAlternateLangUrl(
  currentPath: string,
  currentLang: string
): string {
  const alternateLang = getAlternateLanguage(currentLang);

  // Normalizza il path
  const normalizedPath =
    currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

  // Rimuovi il prefisso della lingua corrente se presente
  let pathWithoutLang = normalizedPath;
  if (currentLang !== defaultLang) {
    const langPrefix = `/${currentLang}`;
    if (normalizedPath === langPrefix) {
      pathWithoutLang = '/';
    } else if (normalizedPath.startsWith(`${langPrefix}/`)) {
      pathWithoutLang = normalizedPath.replace(langPrefix, '');
    }
  }

  // Aggiungi il prefisso della lingua alternativa se non è la default
  if (alternateLang === defaultLang) {
    return pathWithoutLang;
  }

  return pathWithoutLang === '/'
    ? `/${alternateLang}`
    : `/${alternateLang}${pathWithoutLang}`;
}
