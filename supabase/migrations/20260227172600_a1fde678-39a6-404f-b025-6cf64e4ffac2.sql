
-- About Me table (single row, publicly readable/writable since admin is client-side)
CREATE TABLE public.about_me (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bio TEXT NOT NULL DEFAULT '',
  passion_title TEXT NOT NULL DEFAULT '',
  passion TEXT NOT NULL DEFAULT '',
  skills_title TEXT NOT NULL DEFAULT '',
  skills TEXT[] NOT NULL DEFAULT '{}',
  subtitle TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.about_me ENABLE ROW LEVEL SECURITY;

CREATE POLICY "About me is publicly readable" ON public.about_me FOR SELECT USING (true);
CREATE POLICY "About me is publicly writable" ON public.about_me FOR INSERT WITH CHECK (true);
CREATE POLICY "About me is publicly updatable" ON public.about_me FOR UPDATE USING (true);
CREATE POLICY "About me is publicly deletable" ON public.about_me FOR DELETE USING (true);

-- Games table
CREATE TABLE public.games (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  link TEXT,
  translation_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Games are publicly readable" ON public.games FOR SELECT USING (true);
CREATE POLICY "Games are publicly writable" ON public.games FOR INSERT WITH CHECK (true);
CREATE POLICY "Games are publicly updatable" ON public.games FOR UPDATE USING (true);
CREATE POLICY "Games are publicly deletable" ON public.games FOR DELETE USING (true);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_about_me_updated_at
  BEFORE UPDATE ON public.about_me
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON public.games
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
