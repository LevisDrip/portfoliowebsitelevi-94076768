
-- Drop all restrictive policies and recreate as permissive

DROP POLICY IF EXISTS "About me is publicly readable" ON public.about_me;
DROP POLICY IF EXISTS "About me is publicly writable" ON public.about_me;
DROP POLICY IF EXISTS "About me is publicly updatable" ON public.about_me;
DROP POLICY IF EXISTS "About me is publicly deletable" ON public.about_me;

DROP POLICY IF EXISTS "Games are publicly readable" ON public.games;
DROP POLICY IF EXISTS "Games are publicly writable" ON public.games;
DROP POLICY IF EXISTS "Games are publicly updatable" ON public.games;
DROP POLICY IF EXISTS "Games are publicly deletable" ON public.games;

CREATE POLICY "Allow public read about_me" ON public.about_me FOR SELECT USING (true);
CREATE POLICY "Allow public insert about_me" ON public.about_me FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update about_me" ON public.about_me FOR UPDATE USING (true);
CREATE POLICY "Allow public delete about_me" ON public.about_me FOR DELETE USING (true);

CREATE POLICY "Allow public read games" ON public.games FOR SELECT USING (true);
CREATE POLICY "Allow public insert games" ON public.games FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update games" ON public.games FOR UPDATE USING (true);
CREATE POLICY "Allow public delete games" ON public.games FOR DELETE USING (true);
