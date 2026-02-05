import { motion } from "framer-motion";
import { ExternalLink, Gamepad2 } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}

const GameCard = ({ title, description, image, category, link }: GameCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
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
            {category}
          </span>
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
