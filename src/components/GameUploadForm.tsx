import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Upload, ImagePlus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

const categories = ["Action", "RPG", "Platformer", "Puzzle"];

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(300, "Description too long"),
  category: z.string().min(1, "Category is required"),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}

interface GameUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (game: Omit<Game, "id">) => void;
  editingGame?: Game | null;
}

const GameUploadForm = ({ isOpen, onClose, onSubmit, editingGame }: GameUploadFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { t } = useLanguage();
  const isEditing = !!editingGame;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", category: "", link: "" },
  });

  useEffect(() => {
    if (editingGame) {
      form.reset({ title: editingGame.title, description: editingGame.description, category: editingGame.category, link: editingGame.link || "" });
      setImagePreview(editingGame.image);
    } else {
      form.reset({ title: "", description: "", category: "", link: "" });
      setImagePreview(null);
    }
  }, [editingGame, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);
    if (file) {
      if (!file.type.startsWith("image/")) { setImageError(t.form.imageFileError); return; }
      if (file.size > 5 * 1024 * 1024) { setImageError(t.form.imageSizeError); return; }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    if (!imagePreview) { setImageError(t.form.imageRequired); return; }
    onSubmit({ title: values.title, description: values.description, image: imagePreview, category: values.category, link: values.link || undefined });
    form.reset();
    setImagePreview(null);
    onClose();
  };

  const handleClose = () => { form.reset(); setImagePreview(null); setImageError(null); onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
          >
            <div className="glass rounded-xl border border-primary/20 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-gradient">
                  {isEditing ? t.form.editTitle : t.form.addTitle}
                </h2>
                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.form.imageLabel}</label>
                    <div className={`relative aspect-video rounded-lg border-2 border-dashed transition-colors ${imageError ? "border-destructive" : "border-muted-foreground/30 hover:border-primary/50"} overflow-hidden group cursor-pointer`}>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ImagePlus className="w-8 h-8 text-primary" />
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                          <Upload className="w-10 h-10 mb-2" />
                          <span className="text-sm">{t.form.uploadImage}</span>
                          <span className="text-xs mt-1">{t.form.maxSize}</span>
                        </div>
                      )}
                    </div>
                    {imageError && <p className="text-sm font-medium text-destructive">{imageError}</p>}
                  </div>

                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.titleLabel}</FormLabel>
                      <FormControl><Input placeholder={t.form.titlePlaceholder} className="bg-muted/50 border-muted-foreground/20 focus:border-primary" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.descriptionLabel}</FormLabel>
                      <FormControl><Textarea placeholder={t.form.descriptionPlaceholder} className="bg-muted/50 border-muted-foreground/20 focus:border-primary resize-none" rows={3} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.categoryLabel}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className="bg-muted/50 border-muted-foreground/20 focus:border-primary"><SelectValue placeholder={t.form.categoryPlaceholder} /></SelectTrigger></FormControl>
                        <SelectContent>{categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="link" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.linkLabel}</FormLabel>
                      <FormControl><Input placeholder="https://..." className="bg-muted/50 border-muted-foreground/20 focus:border-primary" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary">
                    {isEditing ? (<><Save className="w-4 h-4 mr-2" />{t.form.saveChanges}</>) : (<><Upload className="w-4 h-4 mr-2" />{t.form.addGameBtn}</>)}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameUploadForm;
