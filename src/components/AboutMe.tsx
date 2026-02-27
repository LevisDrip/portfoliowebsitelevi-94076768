import { useMemo } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Code, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BIRTHDAY = new Date(2005, 11, 15); // December 15, 2005

const calculateAge = (birthday: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
};

const AboutMe = () => {
  const { t } = useLanguage();
  const age = useMemo(() => calculateAge(BIRTHDAY), []);

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.about.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.about.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Age Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6 border border-primary/20 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{t.about.ageLabel}</h3>
            <p className="font-display text-4xl font-bold text-gradient">{age}</p>
            <p className="text-sm text-muted-foreground mt-1">{t.about.yearsOld}</p>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass rounded-xl p-6 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-bold text-foreground">{t.about.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t.about.bio}</p>
          </motion.div>

          {/* Passion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 glass rounded-xl p-6 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-bold text-foreground">{t.about.passionTitle}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t.about.passion}</p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-bold text-foreground">{t.about.skillsTitle}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.about.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
