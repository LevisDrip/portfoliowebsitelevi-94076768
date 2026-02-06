import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import GameCard from "./GameCard";
import GameUploadForm from "./GameUploadForm";
import { Button } from "@/components/ui/button";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

const categories = ["All", "Action", "RPG", "Platformer", "Puzzle"];

interface Game {
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

const GamesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [games, setGames] = useState<Game[]>(initialGames);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleAddGame = (newGame: Omit<Game, "id">) => {
    if (editingGame) {
      // Update existing game
      setGames((prev) =>
        prev.map((g) =>
          g.id === editingGame.id ? { ...newGame, id: editingGame.id } : g
        )
      );
      setEditingGame(null);
    } else {
      // Add new game
      const game: Game = {
        ...newGame,
        id: Date.now(),
      };
      setGames((prev) => [game, ...prev]);
    }
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setIsFormOpen(true);
  };

  const handleDeleteGame = (id: number) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingGame(null);
  };

  const filteredGames =
    activeCategory === "All"
      ? games
      : games.filter((game) => game.category === activeCategory);

  return (
    <section id="games" className="py-24 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">My Games</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Explore my collection of games. Each project represents countless
            hours of passion and creativity.
          </p>
        </motion.div>

        {/* Category Filter + Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass glass-hover text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
          <Button
            onClick={() => setIsFormOpen(true)}
            className="px-5 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Game
          </Button>
        </motion.div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              category={game.category}
              link={game.link}
              onEdit={() => handleEditGame(game)}
              onDelete={() => handleDeleteGame(game.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              No games found in this category yet.
            </p>
          </motion.div>
        )}
      </div>

      {/* Upload Form Modal */}
      <GameUploadForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleAddGame}
        editingGame={editingGame}
      />
    </section>
  );
};

export default GamesSection;
