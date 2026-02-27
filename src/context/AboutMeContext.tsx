import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  loading: boolean;
  updateData: (data: AboutMeData) => void;
  clearData: () => void;
}

const AboutMeContext = createContext<AboutMeContextType | undefined>(undefined);

export const AboutMeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AboutMeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rowId, setRowId] = useState<string | null>(null);

  // Load from database on mount
  useEffect(() => {
    const load = async () => {
      const { data: rows } = await supabase
        .from("about_me")
        .select("*")
        .limit(1);

      if (rows && rows.length > 0) {
        const row = rows[0] as any;
        setRowId(row.id);
        setData({
          bio: row.bio,
          passionTitle: row.passion_title,
          passion: row.passion,
          skillsTitle: row.skills_title,
          skills: row.skills || [],
          subtitle: row.subtitle,
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const updateData = useCallback(async (newData: AboutMeData) => {
    setData(newData);

    const dbRow = {
      bio: newData.bio,
      passion_title: newData.passionTitle,
      passion: newData.passion,
      skills_title: newData.skillsTitle,
      skills: newData.skills,
      subtitle: newData.subtitle,
    };

    if (rowId) {
      await supabase.from("about_me").update(dbRow).eq("id", rowId);
    } else {
      const { data: inserted } = await supabase
        .from("about_me")
        .insert(dbRow)
        .select("id");
      if (inserted && inserted.length > 0) {
        setRowId((inserted[0] as any).id);
      }
    }
  }, [rowId]);

  const clearData = useCallback(async () => {
    setData(null);
    if (rowId) {
      await supabase.from("about_me").delete().eq("id", rowId);
      setRowId(null);
    }
  }, [rowId]);

  return (
    <AboutMeContext.Provider value={{ data, loading, updateData, clearData }}>
      {children}
    </AboutMeContext.Provider>
  );
};

export const useAboutMe = () => {
  const context = useContext(AboutMeContext);
  if (!context) throw new Error("useAboutMe must be used within AboutMeProvider");
  return context;
};
