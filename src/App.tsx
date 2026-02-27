import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamesProvider } from "./context/GamesContext";
import { AdminProvider } from "./context/AdminContext";
import { LanguageProvider } from "./context/LanguageContext";
import AdminToggle from "./components/AdminToggle";
import LanguageToggle from "./components/LanguageToggle";
import Index from "./pages/Index";
import GameDetail from "./pages/GameDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AdminProvider>
          <GamesProvider>
            <Toaster />
            <Sonner />
            <AdminToggle />
            <LanguageToggle />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </GamesProvider>
        </AdminProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
