 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Leaf, Menu, X, Globe } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const languages = [
   { code: "en", name: "English" },
   { code: "hi", name: "हिंदी" },
   { code: "ta", name: "தமிழ்" },
   { code: "te", name: "తెలుగు" },
 ];
 
 export function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [currentLang, setCurrentLang] = useState("en");
 
   return (
     <motion.header
       initial={{ y: -20, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.5 }}
       className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
     >
       <div className="glass-card mx-auto max-w-7xl rounded-2xl px-6 py-3">
         <div className="flex items-center justify-between">
           {/* Logo */}
           <a href="/" className="flex items-center gap-2">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
               <Leaf className="h-5 w-5 text-primary-foreground" />
             </div>
             <span className="font-display text-xl font-bold text-foreground">
               Plant<span className="text-primary">Doc</span>
             </span>
           </a>
 
           {/* Desktop Nav */}
           <nav className="hidden md:flex items-center gap-8">
             <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
               Features
             </a>
             <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
               How It Works
             </a>
             <a href="#diseases" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
               Disease Library
             </a>
             <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
               About
             </a>
           </nav>
 
           {/* Actions */}
           <div className="hidden md:flex items-center gap-3">
             {/* Language Selector */}
             <div className="relative group">
               <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                 <Globe className="h-4 w-4" />
                 <span className="text-sm font-medium">{languages.find(l => l.code === currentLang)?.name}</span>
               </button>
               <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-card border border-border rounded-xl shadow-lg py-2 min-w-[120px]">
                 {languages.map((lang) => (
                   <button
                     key={lang.code}
                     onClick={() => setCurrentLang(lang.code)}
                     className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                       currentLang === lang.code ? "text-primary font-medium" : "text-foreground"
                     }`}
                   >
                     {lang.name}
                   </button>
                 ))}
               </div>
             </div>
             <Button variant="hero" size="default">
               Start Scanning
             </Button>
           </div>
 
           {/* Mobile Menu Toggle */}
           <button
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="md:hidden p-2 text-foreground"
           >
             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </button>
         </div>
 
         {/* Mobile Menu */}
         {isMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden mt-4 pt-4 border-t border-border"
           >
             <nav className="flex flex-col gap-3">
               <a href="#features" className="text-foreground py-2 font-medium">Features</a>
               <a href="#how-it-works" className="text-foreground py-2 font-medium">How It Works</a>
               <a href="#diseases" className="text-foreground py-2 font-medium">Disease Library</a>
               <a href="#about" className="text-foreground py-2 font-medium">About</a>
               <div className="flex gap-2 pt-2">
                 {languages.map((lang) => (
                   <button
                     key={lang.code}
                     onClick={() => setCurrentLang(lang.code)}
                     className={`px-3 py-1 rounded-full text-sm ${
                       currentLang === lang.code
                         ? "bg-primary text-primary-foreground"
                         : "bg-secondary text-secondary-foreground"
                     }`}
                   >
                     {lang.name}
                   </button>
                 ))}
               </div>
               <Button variant="hero" className="mt-2 w-full">
                 Start Scanning
               </Button>
             </nav>
           </motion.div>
         )}
       </div>
     </motion.header>
   );
 }