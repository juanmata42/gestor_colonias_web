import constants from './defaultConstants';

// *RCT* --> Only english language must be able for the moment
export const ES_LANGUAGE = 'ES';
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

    // *RCT* --> Navigator.userLanguage does not exist anymore, so we canoot access that property
  } else {
    lang = navigator.language;
  }

  lang = typeof lang !== 'undefined' ? lang.split('-')[0].toUpperCase() : '';

  return ALLOWED_LANGUAGES.includes(lang) ? lang : constants.DEFAULT_LANGUAGE;
}
