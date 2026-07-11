"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const en_1 = __importDefault(require("./en"));
const hi_1 = __importDefault(require("./hi"));
const languages = {
    en: en_1.default,
    hi: hi_1.default,
};
class LocalizationService {
    static checkStrLocalization(key, language = 'en') {
        const selectedLang = languages[language] || languages['en'];
        return selectedLang[key];
    }
    static localize(key, language = 'en', dynamicFields = {}) {
        const selectedLang = languages[language] || languages['en'];
        const rawString = selectedLang[key];
        if (rawString) {
            return rawString.replace(/{{(\w+)}}/g, (match, param) => dynamicFields[param] !== undefined ? String(dynamicFields[param]) : match);
        }
        else {
            return key;
        }
    }
}
exports.default = LocalizationService;
// import stringConstant from '../common/stringConstants';
// function localize(key, lang) {
//    if (lang === "Hindi" && stringConstant?.German[key]) {
//       return stringConstant.Hindi[key];
//    } else {
//       return stringConstant?.English[key] || stringConstant?.Hindi[key] || "Unknown Translated Error";
//    }
// }
