import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

export interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
  translationKey?: string;
}

const defaultCategories = ["Action", "RPG", "Platformer", "Puzzle"];

const defaultGames: Game[] = [
  { id: 1, title: "Stellar Warfare", description: "An epic space battle game with intense multiplayer combat and stunning visuals. Command your fleet across the galaxy.", image: game1, category: "Action", link: "#", translationKey: "stellar" },
  { id: 2, title: "Enchanted Woods", description: "A mystical fantasy RPG set in a magical forest. Discover secrets, battle creatures, and uncover ancient mysteries.", image: game2, category: "RPG", link: "#", translationKey: "enchanted" },
  { id: 3, title: "Pixel Runner", description: "A retro-style platformer with challenging levels, collectibles, and nostalgic 8-bit graphics.", image: game3, category: "Platformer", link: "#", translationKey: "pixel" },
];

// Map translation keys to local images
const localImageMap: Record<string, string> = {
  stellar: game1,
  enchanted: game2,
  pixel: game3,
};

interface GamesContextType {
  games: Game[];
  categories: string[];
  loading: boolean;
  addGame: (game: Omit<Game, "id">) => void;
  updateGame: (id: number, game: Omit<Game, "id">) => void;
  deleteGame: (id: number) => void;
  getGameById: (id: number) => Game | undefined;
  addCategory: (category: string) => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const GamesProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [dbLoaded, setDbLoaded] = useState(false);
  const { t } = useLanguage();

  // Load games from database
  useEffect(() => {
    const load = async () => {
      const { data: rows } = await supabase
        .from("games")
        .select("*")
        .order("created_at", { ascending: false });

      if (rows && rows.length > 0) {
        setGames(rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          image: r.translation_key ? (localImageMap[r.translation_key] || r.image) : r.image,
          category: r.category,
          link: r.link || undefined,
          translationKey: r.translation_key || undefined,
        })));
      } else {
        // Seed defaults into DB
        const inserts = defaultGames.map(g => ({
          title: g.title,
          description: g.description,
          image: g.image,
          category: g.category,
          link: g.link || null,
          translation_key: g.translationKey || null,
        }));
        const { data: inserted } = await supabase
          .from("games")
          .insert(inserts)
          .select("*");

        if (inserted) {
          setGames(inserted.map((r: any) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            image: r.translation_key ? (localImageMap[r.translation_key] || r.image) : r.image,
            category: r.category,
            link: r.link || undefined,
            translationKey: r.translation_key || undefined,
          })));
        }
      }
      setDbLoaded(true);
      setLoading(false);
    };
    load();
  }, []);

  const addCategory = (category: string) => {
    setCategories((prev) => prev.includes(category) ? prev : [...prev, category]);
  };

  const translatedGames = useMemo(() =>
    games.map((game) => {
      if (game.translationKey && t.defaultGames[game.translationKey as keyof typeof t.defaultGames]) {
        const tr = t.defaultGames[game.translationKey as keyof typeof t.defaultGames];
        return { ...game, description: tr.description };
      }
      return game;
    }),
    [games, t]
  );

  const addGame = useCallback(async (newGame: Omit<Game, "id">) => {
    const { data: inserted } = await supabase
      .from("games")
      .insert({
        title: newGame.title,
        description: newGame.description,
        image: newGame.image,
        category: newGame.category,
        link: newGame.link || null,
        translation_key: newGame.translationKey || null,
      })
      .select("*");

    if (inserted && inserted.length > 0) {
      const r = inserted[0] as any;
      setGames((prev) => [{
        id: r.id,
        title: r.title,
        description: r.description,
        image: r.image,
        category: r.category,
        link: r.link || undefined,
        translationKey: r.translation_key || undefined,
      }, ...prev]);
    }
  }, []);

  const updateGame = useCallback(async (id: number, updatedGame: Omit<Game, "id">) => {
    await supabase
      .from("games")
      .update({
        title: updatedGame.title,
        description: updatedGame.description,
        image: updatedGame.image,
        category: updatedGame.category,
        link: updatedGame.link || null,
        translation_key: updatedGame.translationKey || null,
      })
      .eq("id", id);

    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...updatedGame, id } : g))
    );
  }, []);

  const deleteGame = useCallback(async (id: number) => {
    await supabase.from("games").delete().eq("id", id);
    setGames((prev) => prev.filter((game) => game.id !== id));
  }, []);

  const getGameById = (id: number) => {
    return translatedGames.find((game) => game.id === id);
  };

  return (
    <GamesContext.Provider
      value={{ games: translatedGames, categories, loading, addGame, updateGame, deleteGame, getGameById, addCategory }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
};
