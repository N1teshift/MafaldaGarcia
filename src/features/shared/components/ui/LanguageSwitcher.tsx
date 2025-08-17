import { useRouter } from "next/router";

/**
 * A component that allows users to switch the application's language.
 * Displays buttons for available languages (LT, EN, RU).
 * Can be optionally positioned absolutely in the top-right corner.
 *
 * @param props The component props.
 * @param props.absolute Optional. If true, positions the switcher absolutely. Defaults to true.
 * @returns A React element representing the language switcher.
 */
const LanguageSwitcher = ({ absolute = true }: { absolute?: boolean }) => {
    const languages = ["lt", "en", "ru"];

    const router = useRouter();
    const { pathname, asPath, query } = router;

    const changeLanguage = (locale: string) => {
        router.push({ pathname, query }, asPath, { locale });
    };

    // Use absolute positioning only if absolute is true
    const switcherClass = absolute
        ? "absolute top-4 right-4"
        : "flex items-center";

    return (
        <div className={switcherClass}>
            <div className="flex space-x-4">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className={`px-4 py-2 rounded text-black border border-black hover:bg-gray-200 
            ${router.locale === lang ? "bg-gray-300" : "bg-gray-100"}`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;