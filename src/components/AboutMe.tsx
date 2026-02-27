import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Code, Sparkles, Pencil, Check, X, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAdmin } from "@/context/AdminContext";
import { useAboutMe } from "@/context/AboutMeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BIRTHDAY = new Date(2005, 11, 15);

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
  const { isAdmin } = useAdmin();
  const { data: customData, updateData, clearData } = useAboutMe();
  const age = useMemo(() => calculateAge(BIRTHDAY), []);
  const [editing, setEditing] = useState(false);

  // Merge custom data over translation defaults
  const bio = customData?.bio ?? t.about.bio;
  const passionTitle = customData?.passionTitle ?? t.about.passionTitle;
  const passion = customData?.passion ?? t.about.passion;
  const skillsTitle = customData?.skillsTitle ?? t.about.skillsTitle;
  const skills = customData?.skills ?? t.about.skills;
  const subtitle = customData?.subtitle ?? t.about.subtitle;

  // Edit state
  const [editBio, setEditBio] = useState(bio);
  const [editPassionTitle, setEditPassionTitle] = useState(passionTitle);
  const [editPassion, setEditPassion] = useState(passion);
  const [editSkillsTitle, setEditSkillsTitle] = useState(skillsTitle);
  const [editSkills, setEditSkills] = useState(skills.join(", "));
  const [editSubtitle, setEditSubtitle] = useState(subtitle);

  const startEditing = () => {
    setEditBio(bio);
    setEditPassionTitle(passionTitle);
    setEditPassion(passion);
    setEditSkillsTitle(skillsTitle);
    setEditSkills(skills.join(", "));
    setEditSubtitle(subtitle);
    setEditing(true);
  };

  const saveEdits = () => {
    updateData({
      bio: editBio,
      passionTitle: editPassionTitle,
      passion: editPassion,
      skillsTitle: editSkillsTitle,
      skills: editSkills.split(",").map((s) => s.trim()).filter(Boolean),
      subtitle: editSubtitle,
    });
    setEditing(false);
  };

  const cancelEdits = () => setEditing(false);

  const resetToDefaults = () => {
    clearData();
    setEditing(false);
  };

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              <span className="text-gradient">{t.about.title}</span>
            </h2>
            {isAdmin && !editing && (
              <Button size="icon" variant="outline" className="rounded-full" onClick={startEditing}>
                <Pencil className="w-4 h-4" />
              </Button>
            )}
          </div>
          {editing ? (
            <Input
              value={editSubtitle}
              onChange={(e) => setEditSubtitle(e.target.value)}
              className="max-w-xl mx-auto text-center"
            />
          ) : (
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {isAdmin && editing && (
          <div className="flex justify-center gap-2 mb-8">
            <Button onClick={saveEdits} size="sm" className="gap-1">
              <Check className="w-4 h-4" /> Save
            </Button>
            <Button onClick={cancelEdits} size="sm" variant="outline" className="gap-1">
              <X className="w-4 h-4" /> Cancel
            </Button>
            <Button onClick={resetToDefaults} size="sm" variant="ghost" className="gap-1">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
          </div>
        )}

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
            {editing ? (
              <Textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={4} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
            )}
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
              {editing ? (
                <Input value={editPassionTitle} onChange={(e) => setEditPassionTitle(e.target.value)} className="font-display text-lg font-bold" />
              ) : (
                <h3 className="font-display text-lg font-bold text-foreground">{passionTitle}</h3>
              )}
            </div>
            {editing ? (
              <Textarea value={editPassion} onChange={(e) => setEditPassion(e.target.value)} rows={4} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{passion}</p>
            )}
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
              {editing ? (
                <Input value={editSkillsTitle} onChange={(e) => setEditSkillsTitle(e.target.value)} className="font-display text-lg font-bold" />
              ) : (
                <h3 className="font-display text-lg font-bold text-foreground">{skillsTitle}</h3>
              )}
            </div>
            {editing ? (
              <div>
                <Input value={editSkills} onChange={(e) => setEditSkills(e.target.value)} placeholder="Comma-separated skills" />
                <p className="text-xs text-muted-foreground mt-1">Separate skills with commas</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
