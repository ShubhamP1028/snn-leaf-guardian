import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Workflow", href: "/workflow" },
  { label: "Disease Library", href: "/#diseases" },
  { label: "References", href: "/references" },
  { label: "About Us", href: "/about" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/";
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="glass-card mx-auto max-w-7xl rounded-2xl px-5 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Project A.D.I.T.I. logo" className="h-9 w-9 rounded-lg object-contain" />
            <span className="text-lg font-bold text-foreground tracking-tight">
              Project <span className="text-accent">A.D.I.T.I.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <Link
                  key={link.label}
                  to="/"
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Link to="/#features">
              <Button variant="default" size="sm" onClick={() => handleNavClick("/#features")}>
                Start Scanning
              </Button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-3 pt-3 border-t border-border overflow-hidden"
            >
              <nav className="flex flex-col gap-1 pb-3">
                {navLinks.map((link) =>
                  link.href.startsWith("/#") ? (
                    <Link
                      key={link.label}
                      to="/"
                      onClick={() => handleNavClick(link.href)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.href) ? "text-accent bg-accent/10" : "text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.href) ? "text-accent bg-accent/10" : "text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <Link to="/#features" onClick={() => handleNavClick("/#features")}>
                  <Button variant="default" size="sm" className="w-full mt-2">
                    Start Scanning
                  </Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
