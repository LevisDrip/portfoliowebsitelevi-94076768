import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, KeyRound } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminToggle = () => {
  const { isAdmin, login, logout } = useAdmin();
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const success = await login(password);
    setLoading(false);
    if (success) {
      setShowPrompt(false);
      setPassword("");
    } else {
      setError(true);
    }
  };

  if (isAdmin) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={logout}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform glow-primary"
        title="Logout admin"
      >
        <LogOut className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setShowPrompt(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass glass-hover text-muted-foreground hover:text-foreground shadow-lg transition-all"
        title="Admin login"
      >
        <Lock className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => { setShowPrompt(false); setError(false); setPassword(""); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-6 rounded-xl w-full max-w-sm mx-4 border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <KeyRound className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">Admin Access</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  autoFocus
                  className={error ? "border-destructive" : ""}
                />
                {error && (
                  <p className="text-sm text-destructive">Incorrect password</p>
                )}
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Checking..." : "Login"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowPrompt(false); setError(false); setPassword(""); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminToggle;
