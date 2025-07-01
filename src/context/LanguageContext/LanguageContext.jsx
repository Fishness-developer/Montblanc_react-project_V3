// src/context/LanguageContext/LanguageContext.jsx
import {createContext, useMemo, useContext, useState} from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import messages from '../../i18n/messages.jsx';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [locale, setLocale] = useState('en');

	const value = useMemo(() => ({ locale, setLocale }), [locale]);

	return (
		<LanguageContext.Provider value={value}>
			<IntlProvider locale={locale} messages={messages[locale]}>
				{children}
			</IntlProvider>
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	const intl = useIntl(); // Получаем объект intl для форматирования сообщений
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return {
		locale: context.locale,
		setLocale: context.setLocale,
		translate: (id) => intl.formatMessage({ id }), // Функция перевода
	};
};

export default LanguageContext;