import { createContext, useMemo, useContext, useState, useEffect } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import messages from '../../i18n/messages.jsx';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [locale, setLocale] = useState(() => {
		// Проверяем, есть ли сохраненная локаль в localStorage
		return localStorage.getItem('locale') || 'en';
	});

	// Сохраняем локаль в localStorage при ее изменении
	useEffect(() => {
		localStorage.setItem('locale', locale);
	}, [locale]);

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
	const intl = useIntl();
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return {
		locale: context.locale,
		setLocale: context.setLocale,
		translate: (id) => intl.formatMessage({ id }),
	};
};

export default LanguageContext;