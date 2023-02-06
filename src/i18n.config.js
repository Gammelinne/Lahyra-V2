import { createI18n  } from 'vue-i18n';
import fr from './Languages/fr.json';
import en from './Languages/en.json';

const messages = {
  fr,
  en
};

export default new createI18n({
    //get language from browser
    locale: localStorage.getItem('language') || navigator.language,
    fallbackLocale: 'en',
    messages
});