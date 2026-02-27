import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface AboutMeData {
  bio: string;
  passionTitle: string;
  passion: string;
  skillsTitle: string;
  skills: string[];
  subtitle: string;
}

interface AboutMeContextType {
  data: AboutMeData | null;
  updateData: (data: AboutMeData) => void;
  clearData: () => void;
}

const STORAGE_KEY = "aboutme-custom";

const AboutMeContext = createContext<AboutMeContextType | undefined>(undefined);

function loadFromStorage(): AboutMeData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export const AboutMeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AboutMeData | null>(() => loadFromStorage());

  const updateData = useCallback((newData: AboutMeData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const clearData = useCallback(() => {
    setData(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AboutMeContext.Provider value={{ data, updateData, clearData }}>
      {children}
    </AboutMeContext.Provider>
  );
};

export const useAboutMe = () => {
  const context = useContext(AboutMeContext);
  if (!context) throw new Error("useAboutMe must be used within AboutMeProvider");
  return context;
};
