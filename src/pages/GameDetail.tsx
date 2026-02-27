import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGames } from "@/context/GamesContext";
import { useLanguage } from "@/context/LanguageContext";

const categoryMap: Record<string, "action" | "rpg" | "platformer" | "puzzle"> = {
  Action: "action", RPG: "rpg", Platformer: "platformer", Puzzle: "puzzle",
};

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGameById } = useGames();
  const { t } = useLanguage();

  const game = id ? getGameById(parseInt(id)) : undefined;

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">{t.detail.notFoundTitle}</h1>
          <p className="text-muted-foreground mb-8">{t.detail.notFoundDesc}</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.detail.backToPortfolio}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-6 left-6">
          <Button onClick={() => navigate("/")} variant="outline" className="glass border-primary/30 hover:bg-primary/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.detail.back}
          </Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="absolute bottom-8 left-6 md:left-12">
          <span className="px-4 py-2 text-sm font-medium rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
            {categoryMap[game.category] ? t.games[categoryMap[game.category]] : game.category}
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{game.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">{game.description}</p>
            <div className="flex flex-wrap gap-4">
              {game.link && game.link !== "#" && (
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
                  <a href={game.link} target="_blank" rel="noopener noreferrer">
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    {t.detail.playNow}
                  </a>
                </Button>
              )}
              {game.link && game.link !== "#" && (
                <Button asChild variant="outline" className="glass border-primary/30 hover:bg-primary/20">
                  <a href={game.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t.detail.viewProject}
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-16 glass rounded-xl p-8 border border-primary/20">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">{t.detail.gameDetails}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{t.detail.category}</h3>
                <p className="text-foreground font-medium">{categoryMap[game.category] ? t.games[categoryMap[game.category]] : game.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{t.detail.status}</h3>
                <p className="text-primary font-medium">{t.detail.available}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
