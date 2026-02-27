import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "nl" : "en")}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full glass glass-hover text-muted-foreground hover:text-foreground shadow-lg transition-all"
      title="Toggle language"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">{language === "en" ? "NL" : "EN"}</span>
    </button>
  );
};

export default LanguageToggle;
