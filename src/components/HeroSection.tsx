import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Dark Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AI-powered agricultural technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient-overlay" />
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Project Name */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl md:text-2xl text-white/70 font-medium mb-8 ml-[55%]"
            style={{ fontFamily: "'Lucida Console', 'Courier New', monospace" }}
          >
            PROJECT <span className="text-accent font-bold">A.D.I.T.I.</span>
          </motion.p>
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Agricultural Disease{" "}
            Inference 
            <br />
            via
            <br />
            
            <span className="gradient-text-cyan">Temporal <br /> Intelligence</span>
          </motion.h1>


          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
          >
            Plant Disease Detection using SNN based image classification.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-6"
          >
            
            <Button variant="hero" size="xl">
              <a
              href="#features"
              className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
            >
              Get Started
            </a>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
