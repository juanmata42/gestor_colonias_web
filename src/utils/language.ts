import { constants, ES_LANGUAGE } from './defaultConstants';

export const ALLOWED_LANGUAGES = [ES_LANGUAGE];

/**
 * @name getBrowserLanguage
 * Function to get user language
 *
 * @returns {String} browser lang
 */
export function getBrowserLanguage(): string {
  let lang = '';

  if (navigator.languages && navigator.languages.length) {
    lang = navigator.languages[0];
  } else {
    lang = navigator.language;
  }

  lang = typeof lang !== 'undefined' ? lang.split('-')[0].toUpperCase() : '';

  return ALLOWED_LANGUAGES.includes(lang) ? lang : constants.DEFAULT_LANGUAGE;
}
