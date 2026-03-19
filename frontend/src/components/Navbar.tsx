import { Link, useLocation } from "wouter";
import { useTheme } from "../contexts/ThemeContext";
import { CheckCircle, Menu, Moon, Sun, X, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
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

  // Close mobile menu on location change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Home", href: "/", type: "link" },
    { label: "Quizzes", href: "#quizzes", type: "anchor" },
    { label: "Leaderboard", href: "#leaderboard", type: "anchor" },
    { label: "Contributors", href: "/contributions", type: "link" },
  ];

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

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((nav) =>
                nav.type === "link" ? (
                  <Link
                    key={nav.href}
                    href={nav.href}
                    className={`text-sm font-medium transition-colors ${
                      location === nav.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {nav.label}
                  </Link>
                ) : (
                  <a
                    key={nav.href}
                    href={nav.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {nav.label}
                  </a>
                ),
              )}
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

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-card shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm text-muted-foreground">
                        Guest User
                      </p>
                    </div>

                    {/* Admin link */}
                    <Link
                      href="/admin"
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors ${
                        location === "/admin" ? "text-primary" : ""
                      }`}
                      data-testid="nav-admin"
                      onClick={() => setProfileOpen(false)}
                      >
                      <LayoutDashboard className="w-4 h-4" />
                      My Quizzes
                    </Link>

                    {/* Dark mode toggle */}
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

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            {/* Nav Links */}
            <div className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((nav) =>
                nav.type === "link" ? (
                  <Link
                    key={nav.href}
                    href={nav.href}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location === nav.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {nav.label}
                  </Link>
                ) : (
                  <a
                    key={nav.href}
                    href={nav.href}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {nav.label}
                  </a>
                ),
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border mx-4" />

            {/* Bottom Profile Section */}
            <div className="flex flex-col px-4 py-3 gap-1">
              {/* Admin */}
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location === "/admin"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                My Quizzes
              </Link>
              {/* Dark mode */}
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


              {/* Profile info */}
              <div className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(220,90%,55%)] flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-muted-foreground">
                    admin@quiz.com
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