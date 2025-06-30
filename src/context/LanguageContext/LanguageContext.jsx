
import { createContext, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import messages from "../../i18n/messages.jsx";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [locale, setLocale] = useState("en");

	const value = useMemo(() => ({ locale, setLocale }), [locale]);

	return (
		<LanguageContext.Provider value={value}>
			<IntlProvider locale={locale} messages={messages[locale]}>
				{children}
			</IntlProvider>
		</LanguageContext.Provider>
	);
};

export default LanguageContext;
