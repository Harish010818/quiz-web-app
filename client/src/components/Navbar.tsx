import { Link, useLocation } from "wouter";
import { useTheme } from "../contexts/ThemeContext";
import { CheckCircle, Menu, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-[hsl(220,90%,55%)] flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">QuizMaster</h1>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors ${
              location === "/" ? "text-primary" : "text-foreground hover:text-primary"
            }`} data-testid="nav-home">
              Home
            </Link>
            <a href="#quizzes" className="text-sm font-medium text-foreground hover:text-primary transition-colors" data-testid="nav-quizzes">
              Quizzes
            </a>
            <a href="#leaderboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors" data-testid="nav-leaderboard">
              Leaderboard
            </a>
            <Link href="/contributions" className={`text-sm font-medium transition-colors ${
              location === "/contributions" ? "text-primary" : "text-foreground hover:text-primary"
            }`} data-testid="nav-contributions">
              Contributers
            </Link>
            <Link href="/admin" className={`text-sm font-medium transition-colors ${
              location === "/admin" ? "text-primary" : "text-foreground hover:text-primary"
            }`} data-testid="nav-admin">
              Admin
            </Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors" 
              aria-label="Toggle theme"
              data-testid="theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            {/* Mobile Menu */}
            <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Open menu" data-testid="mobile-menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
