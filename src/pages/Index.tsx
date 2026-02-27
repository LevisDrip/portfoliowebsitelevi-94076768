import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import GamesSection from "@/components/GamesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <AboutMe />
      <GamesSection />
      <Footer />
    </main>
  );
};

export default Index;
