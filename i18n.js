import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		"weight": "Weight:",
		"height": "Height:",
		"calc": "Calculate"
	},
	pt: {
		"weight": "Massa:",
		"height": "Altura:",
		"calc": "Calcular"
	}
};

i18n.use(initReactI18next).init({compatibilityJSON: 'v3', fallbackLng: 'en', resources});

export default i18n;