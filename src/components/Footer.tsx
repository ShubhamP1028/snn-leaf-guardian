 import { Leaf, Github, Twitter, Mail } from "lucide-react";
 
 export function Footer() {
   return (
     <footer id="about" className="py-16 bg-card border-t border-border">
       <div className="container mx-auto px-4">
         <div className="grid md:grid-cols-4 gap-8 mb-12">
           {/* Brand */}
           <div className="md:col-span-2">
             <a href="/" className="flex items-center gap-2 mb-4">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                 <Leaf className="h-5 w-5 text-primary-foreground" />
               </div>
               <span className="font-display text-xl font-bold text-foreground">
                 Plant<span className="text-primary">Doc</span>
               </span>
             </a>
             <p className="text-muted-foreground max-w-md mb-4">
               Plant Disease Detection using Spiking Neural Networks with Cython Optimization.
               A B.Tech Capstone Project focused on empowering Indian smallholder farmers.
             </p>
             <div className="flex gap-3">
               <a
                 href="https://github.com"
                 className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
               >
                 <Github className="h-5 w-5" />
               </a>
               <a
                 href="https://twitter.com"
                 className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
               >
                 <Twitter className="h-5 w-5" />
               </a>
               <a
                 href="mailto:contact@plantdoc.ai"
                 className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
               >
                 <Mail className="h-5 w-5" />
               </a>
             </div>
           </div>
 
           {/* Links */}
           <div>
             <h4 className="font-display font-bold text-foreground mb-4">Product</h4>
             <ul className="space-y-2">
               <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
               <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
               <li><a href="#diseases" className="text-muted-foreground hover:text-foreground transition-colors">Disease Library</a></li>
               <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Access</a></li>
             </ul>
           </div>
 
           <div>
             <h4 className="font-display font-bold text-foreground mb-4">Research</h4>
             <ul className="space-y-2">
               <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Technical Paper</a></li>
               <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub Repo</a></li>
               <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">PlantVillage Dataset</a></li>
               <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">SNN Resources</a></li>
             </ul>
           </div>
         </div>
 
         <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-muted-foreground text-sm">
             © 2026 PlantDoc. Built by Shubham Pandey. B.Tech Capstone Project.
           </p>
           <div className="flex gap-6 text-sm">
             <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
             <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
             <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
           </div>
         </div>
       </div>
     </footer>
   );
 }