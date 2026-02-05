import { useState } from "react";
import { motion } from "framer-motion";
import GameCard from "./GameCard";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

const categories = ["All", "Action", "RPG", "Platformer", "Puzzle"];

const sampleGames = [
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

  const filteredGames =
    activeCategory === "All"
      ? sampleGames
      : sampleGames.filter((game) => game.category === activeCategory);

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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
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
    </section>
  );
};

export default GamesSection;
