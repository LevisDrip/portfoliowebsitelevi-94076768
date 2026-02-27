import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Gamepad2, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const categoryMap: Record<string, "action" | "rpg" | "platformer" | "puzzle"> = {
  Action: "action", RPG: "rpg", Platformer: "platformer", Puzzle: "puzzle",
};

interface GameCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const GameCard = ({ id, title, description, image, category, link, onEdit, onDelete }: GameCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const translatedCategory = categoryMap[category] ? t.games[categoryMap[category]] : category;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button[aria-label]')) return;
    navigate(`/game/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-lg glass glass-hover cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
            {translatedCategory}
          </span>
        </div>

        {/* Edit/Delete Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 rounded-lg bg-accent/80 hover:bg-accent text-accent-foreground backdrop-blur-sm transition-colors"
              aria-label="Edit game"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 rounded-lg bg-destructive/80 hover:bg-destructive text-destructive-foreground backdrop-blur-sm transition-colors"
              aria-label="Delete game"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Play Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center glow-primary">
            <Gamepad2 className="w-8 h-8 text-primary-foreground" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          {link && (
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default GameCard;
