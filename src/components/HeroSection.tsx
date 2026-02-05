 import { motion } from "framer-motion";
 import { ArrowRight, Zap, Wifi, Shield, Camera } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import heroBg from "@/assets/hero-bg.jpg";
 
 const stats = [
   { value: "38+", label: "Disease Classes" },
   { value: "<10ms", label: "Inference Time" },
   { value: "95%+", label: "Accuracy" },
   { value: "10x", label: "Energy Efficient" },
 ];
 
 export function HeroSection() {
   return (
     <section className="relative min-h-screen flex items-center overflow-hidden">
       {/* Background Image */}
       <div className="absolute inset-0 z-0">
         <img
           src={heroBg}
           alt="Lush green crops"
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
         <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
       </div>
 
       {/* Floating Elements */}
       <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute w-2 h-2 rounded-full bg-accent/40"
             style={{
               left: `${15 + i * 15}%`,
               top: `${20 + (i % 3) * 25}%`,
             }}
             animate={{
               y: [0, -20, 0],
               opacity: [0.3, 0.8, 0.3],
             }}
             transition={{
               duration: 3 + i * 0.5,
               repeat: Infinity,
               ease: "easeInOut",
               delay: i * 0.3,
             }}
           />
         ))}
       </div>
 
       {/* Content */}
       <div className="relative z-20 container mx-auto px-4 pt-32 pb-20">
         <div className="max-w-4xl">
           {/* Badge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-6"
           >
             <Zap className="h-4 w-4 text-accent" />
             <span className="text-primary-foreground/90 text-sm font-medium">
               Powered by Spiking Neural Networks
             </span>
           </motion.div>
 
           {/* Headline */}
           <motion.h1
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
           >
             Detect Plant Diseases{" "}
             <span className="relative inline-block">
               <span className="text-accent">Instantly</span>
               <motion.span
                 className="absolute -bottom-2 left-0 right-0 h-1 bg-accent rounded-full"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ duration: 0.6, delay: 0.8 }}
               />
             </span>
           </motion.h1>
 
           {/* Subtitle */}
           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-8 leading-relaxed"
           >
             Revolutionary AI-powered plant disease detection using next-gen neural networks.
             Designed for 120M+ Indian smallholder farmers with offline capability, 
             instant results, and local language support.
           </motion.p>
 
           {/* CTA Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="flex flex-wrap gap-4 mb-12"
           >
             <Button variant="hero" size="xl">
               <Camera className="h-5 w-5 mr-2" />
               Scan Your Plant
               <ArrowRight className="h-5 w-5 ml-2" />
             </Button>
             <Button variant="hero-outline" size="xl">
               Learn More
             </Button>
           </motion.div>
 
           {/* Feature Pills */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="flex flex-wrap gap-3"
           >
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm">
               <Wifi className="h-4 w-4 text-accent" />
               <span className="text-primary-foreground/90 text-sm">Works Offline</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm">
               <Zap className="h-4 w-4 text-accent" />
               <span className="text-primary-foreground/90 text-sm">Edge-Ready</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm">
               <Shield className="h-4 w-4 text-accent" />
               <span className="text-primary-foreground/90 text-sm">Privacy First</span>
             </div>
           </motion.div>
         </div>
 
         {/* Stats Bar */}
         <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.6 }}
           className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
         >
           {stats.map((stat, index) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
               className="glass-card rounded-2xl p-6 text-center border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-xl"
             >
               <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">
                 {stat.value}
               </div>
               <div className="text-primary-foreground/70 text-sm font-medium">
                 {stat.label}
               </div>
             </motion.div>
           ))}
         </motion.div>
       </div>
     </section>
   );
 }