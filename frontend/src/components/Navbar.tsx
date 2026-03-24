import { Link, useLocation } from "wouter";
import { useTheme } from "../contexts/ThemeContext";
import { CheckCircle, Menu, Moon, Sun, X, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthUserContext";
import axios from "axios";
import { toast } from "../hooks/use-toast";

// ✅ Custom hook — always go home first then scroll
const useScrollToSection = () => {
  const [, navigate] = useLocation();

  return (sectionId: string) => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
};

export default function Navbar() {
  const { authUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const scrollTo = useScrollToSection();

  const onSignOutHandler = () => {
    setProfileOpen(false);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`);

        if(res){
          toast({
            title: "",
            description: res.data
          })
        }
      } catch (err) {}
    };

    fetchUser();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
              data-testid="logo-link"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-[hsl(220,90%,55%)] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">QuizMaster</h1>
            </Link>

            {/* ── Desktop Nav Links ─────────────────────────── */}
            <div className="hidden md:flex items-center gap-6">
              {/* Home — wouter Link */}
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  location === "/"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Home
              </Link>

              {/* Quizzes — scroll to section */}
              <button
                onClick={() => scrollTo("quizzes")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Quizzes
              </button>

              {/* Leaderboard — scroll to section */}
              <button
                onClick={() => scrollTo("leaderboard")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Leaderboard
              </button>

              {/* Contributors — separate full page */}
              <Link
                href="/contributions"
                className={`text-sm font-medium transition-colors ${
                  location === "/contributions"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
              Contributors
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Profile Circle — Desktop */}
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[hsl(220,90%,55%)] flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
                  aria-label="Profile menu"
                  data-testid="profile-toggle"
                >
                  <User className="w-4 h-4 text-primary-foreground" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-card shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm text-muted-foreground">
                        {authUser ? authUser.username : "Guest User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {authUser ? authUser.email : "anonymous@quiz.com"}
                      </p>
                    </div>

                    <Link
                      href="/my-quizzes"
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors ${
                        location === "/my-quizzes" ? "text-primary" : ""
                      }`}
                      onClick={() => setProfileOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Quizzes
                    </Link>

                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                      data-testid="theme-toggle"
                    >
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </button>

                    {authUser ? (
                      <button
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        onClick={onSignOutHandler}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LogIn className="w-4 h-4" />
                        Sign in
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Hamburger — Mobile only */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Open menu"
                data-testid="mobile-menu"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ─────────────────────────────────── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="flex flex-col px-4 py-3 gap-1">
              {/* Home */}
              <Link
                href="/"
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location === "/"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                Home
              </Link>

              {/* Quizzes — scroll */}
              <button
                onClick={() => {
                  scrollTo("quizzes");
                  setMobileOpen(false);
                }}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
              >
                Quizzes
              </button>

              {/* Leaderboard — scroll */}
              <button
                onClick={() => {
                  scrollTo("leaderboard");
                  setMobileOpen(false);
                }}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
              >
                Leaderboard
              </button>

              {/* Contributors — full page */}
              <Link
                href="/contributions"
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location === "/contributions"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                Contributors
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-border mx-4" />

            {/* Bottom Profile Section */}
            <div className="flex flex-col px-4 py-3 gap-1">
              <Link
                href="/my-quizzes"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location === "/my-quizzes"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                My Quizzes
              </Link>

              <button
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors w-full text-left"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>

              {authUser ? (
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted text-foreground transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted text-foreground transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign in
                </Link>
              )}

              {/* Profile info */}
              <div className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(220,90%,55%)] flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {authUser ? `${authUser.username}` : "Guest User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {authUser ? `${authUser.email}` : "anonymous@quiz.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}