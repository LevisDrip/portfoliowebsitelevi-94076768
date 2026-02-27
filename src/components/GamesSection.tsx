import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import GameCard from "./GameCard";
import GameUploadForm from "./GameUploadForm";
import { Button } from "@/components/ui/button";
import { useGames, Game } from "@/context/GamesContext";
import { useAdmin } from "@/context/AdminContext";
import { useLanguage } from "@/context/LanguageContext";

const builtInLabels: Record<string, (t: any) => string> = {
  Action: (t) => t.games.action,
  RPG: (t) => t.games.rpg,
  Platformer: (t) => t.games.platformer,
  Puzzle: (t) => t.games.puzzle,
};

const GamesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { games, categories, addGame, updateGame, deleteGame } = useGames();
  const { isAdmin } = useAdmin();
  const { t } = useLanguage();

  const getCategoryLabel = (cat: string) => {
    if (cat === "All") return t.games.all;
    return builtInLabels[cat] ? builtInLabels[cat](t) : cat;
  };
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleAddGame = (newGame: Omit<Game, "id">) => {
    if (editingGame) {
      updateGame(editingGame.id, newGame);
      setEditingGame(null);
    } else {
      addGame(newGame);
    }
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setIsFormOpen(true);
  };

  const handleDeleteGame = (id: number) => {
    deleteGame(id);
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.games.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.games.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-3 mb-12"
        >
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass glass-hover text-muted-foreground hover:text-foreground"
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
          {isAdmin && (
            <Button
              onClick={() => setIsFormOpen(true)}
              className="px-5 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-1" />
              {t.games.addGame}
            </Button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              category={game.category}
              link={game.link}
              onEdit={isAdmin ? () => handleEditGame(game) : undefined}
              onDelete={isAdmin ? () => handleDeleteGame(game.id) : undefined}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-muted-foreground">{t.games.noGames}</p>
          </motion.div>
        )}
      </div>

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
