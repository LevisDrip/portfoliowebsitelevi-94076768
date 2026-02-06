import { createContext, useContext, useState, ReactNode } from "react";
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
}

const initialGames: Game[] = [
  {
    id: 1,
    title: "Stellar Warfare",
    description: "An epic space battle game with intense multiplayer combat and stunning visuals. Command your fleet across the galaxy.",
    image: game1,
    category: "Action",
    link: "#",
  },
  {
    id: 2,
    title: "Enchanted Woods",
    description: "A mystical fantasy RPG set in a magical forest. Discover secrets, battle creatures, and uncover ancient mysteries.",
    image: game2,
    category: "RPG",
    link: "#",
  },
  {
    id: 3,
    title: "Pixel Runner",
    description: "A retro-style platformer with challenging levels, collectibles, and nostalgic 8-bit graphics.",
    image: game3,
    category: "Platformer",
    link: "#",
  },
];

interface GamesContextType {
  games: Game[];
  addGame: (game: Omit<Game, "id">) => void;
  updateGame: (id: number, game: Omit<Game, "id">) => void;
  deleteGame: (id: number) => void;
  getGameById: (id: number) => Game | undefined;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const GamesProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<Game[]>(initialGames);

  const addGame = (newGame: Omit<Game, "id">) => {
    const game: Game = {
      ...newGame,
      id: Date.now(),
    };
    setGames((prev) => [game, ...prev]);
  };

  const updateGame = (id: number, updatedGame: Omit<Game, "id">) => {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...updatedGame, id } : g))
    );
  };

  const deleteGame = (id: number) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  const getGameById = (id: number) => {
    return games.find((game) => game.id === id);
  };

  return (
    <GamesContext.Provider
      value={{ games, addGame, updateGame, deleteGame, getGameById }}
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
