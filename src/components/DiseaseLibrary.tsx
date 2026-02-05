 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Search, Leaf, AlertTriangle, ChevronRight } from "lucide-react";
 
 const diseases = [
   {
     id: 1,
     name: "Tomato Late Blight",
     plant: "Tomato",
     severity: "High",
     symptoms: "Dark water-soaked lesions on leaves, white fungal growth",
     image: "🍅",
   },
   {
     id: 2,
     name: "Apple Scab",
     plant: "Apple",
     severity: "Medium",
     symptoms: "Olive-green to black spots on leaves and fruit",
     image: "🍎",
   },
   {
     id: 3,
     name: "Corn Gray Leaf Spot",
     plant: "Corn",
     severity: "High",
     symptoms: "Rectangular gray lesions parallel to leaf veins",
     image: "🌽",
   },
   {
     id: 4,
     name: "Grape Black Rot",
     plant: "Grape",
     severity: "High",
     symptoms: "Brown circular lesions with dark margins on leaves",
     image: "🍇",
   },
   {
     id: 5,
     name: "Potato Early Blight",
     plant: "Potato",
     severity: "Medium",
     symptoms: "Concentric ring patterns on older leaves",
     image: "🥔",
   },
   {
     id: 6,
     name: "Strawberry Leaf Scorch",
     plant: "Strawberry",
     severity: "Low",
     symptoms: "Purple spots that develop tan centers",
     image: "🍓",
   },
 ];
 
 const severityColors = {
   High: "bg-destructive/10 text-destructive border-destructive/20",
   Medium: "bg-accent/10 text-accent border-accent/20",
   Low: "bg-success/10 text-success border-success/20",
 };
 
 export function DiseaseLibrary() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedDisease, setSelectedDisease] = useState<number | null>(null);
 
   const filteredDiseases = diseases.filter(
     (d) =>
       d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       d.plant.toLowerCase().includes(searchQuery.toLowerCase())
   );
 
   return (
     <section id="diseases" className="py-20 bg-muted/30 relative overflow-hidden">
       <div className="absolute inset-0 leaf-pattern opacity-20" />
       
       <div className="container mx-auto px-4 relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-12"
         >
           <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
             Disease Encyclopedia
           </span>
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
             38+ Plant Diseases Covered
           </h2>
           <p className="text-muted-foreground max-w-2xl mx-auto">
             Our model is trained on the PlantVillage dataset covering major crop diseases 
             affecting Indian agriculture.
           </p>
         </motion.div>
 
         {/* Search Bar */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="max-w-md mx-auto mb-10"
         >
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <input
               type="text"
               placeholder="Search diseases or plants..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
             />
           </div>
         </motion.div>
 
         {/* Disease Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
           <AnimatePresence>
             {filteredDiseases.map((disease, index) => (
               <motion.div
                 key={disease.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.4, delay: index * 0.05 }}
                 onClick={() => setSelectedDisease(selectedDisease === disease.id ? null : disease.id)}
                 className="group cursor-pointer"
               >
                 <div className={`p-5 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 ${
                   selectedDisease === disease.id ? "border-primary shadow-lg" : "border-border"
                 }`}>
                   <div className="flex items-start gap-4">
                     {/* Icon */}
                     <div className="text-4xl">{disease.image}</div>
 
                     {/* Content */}
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-1">
                         <h3 className="font-display font-bold text-foreground truncate">
                           {disease.name}
                         </h3>
                         <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${
                           selectedDisease === disease.id ? "rotate-90" : ""
                         }`} />
                       </div>
 
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-sm text-muted-foreground flex items-center gap-1">
                           <Leaf className="h-3 w-3" />
                           {disease.plant}
                         </span>
                         <span className={`text-xs px-2 py-0.5 rounded-full border ${
                           severityColors[disease.severity as keyof typeof severityColors]
                         }`}>
                           {disease.severity}
                         </span>
                       </div>
 
                       <AnimatePresence>
                         {selectedDisease === disease.id && (
                           <motion.div
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: "auto" }}
                             exit={{ opacity: 0, height: 0 }}
                             transition={{ duration: 0.2 }}
                           >
                             <p className="text-sm text-muted-foreground pt-2 border-t border-border mt-2">
                               <AlertTriangle className="h-3 w-3 inline mr-1" />
                               {disease.symptoms}
                             </p>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   </div>
                 </div>
               </motion.div>
             ))}
           </AnimatePresence>
         </div>
 
         {filteredDiseases.length === 0 && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-center py-12"
           >
             <p className="text-muted-foreground">No diseases found matching your search.</p>
           </motion.div>
         )}
       </div>
     </section>
   );
 }