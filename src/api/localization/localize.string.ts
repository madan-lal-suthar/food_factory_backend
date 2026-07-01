import en from './en';
import hi from './hi';


type LanguageStrings = { [key: string]: string };
type Languages = { [key: string]: LanguageStrings };

const languages: Languages = {
  en,
  hi,
};

class LocalizationService {
    static checkStrLocalization(key: string, language: string = 'en'): string | undefined {
        const selectedLang = languages[language] || languages['en'];
        return selectedLang[key];
    }

    static localize(
        key: string,
        language: string  = 'en',
        dynamicFields: { [key: string]: string | number } = {}
    ): string {
        const selectedLang = languages[language] || languages['en'];
        const rawString = selectedLang[key];
        if (rawString) {
            return rawString.replace(/{{(\w+)}}/g, (match: string, param: string) =>
                dynamicFields[param] !== undefined ? String(dynamicFields[param]) : match
            );
        } else {
            return key;
        }
    }
}

export default LocalizationService;


// import stringConstant from '../common/stringConstants';

// function localize(key, lang) {
//    if (lang === "Hindi" && stringConstant?.German[key]) {
//       return stringConstant.Hindi[key];
//    } else {
//       return stringConstant?.English[key] || stringConstant?.Hindi[key] || "Unknown Translated Error";
//    }
// }








