import {useMemo} from 'react';
import {translations} from './translations';

function useTranslate(component, lang) {
	const translatedText = useMemo(() => translate(translations[component], lang),
		[component, lang]);

	return translatedText;
}

function translate(data, lang) {
	const temp = {};

	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			temp[key] = data[key][lang];
		}
	}

	return temp;
}

export default useTranslate;
