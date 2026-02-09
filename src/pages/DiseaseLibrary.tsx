import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Leaf, ChevronDown, Bug, ShieldCheck, AlertTriangle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Disease {
  name: string;
  description: string;
  severity: "High" | "Medium" | "Low" | "Healthy";
}

interface PlantData {
  plant: string;
  emoji: string;
  diseases: Disease[];
}

const plantData: PlantData[] = [
  {
    plant: "Apple",
    emoji: "🍎",
    diseases: [
      { name: "Apple Scab", description: "Caused by Venturia inaequalis. Produces olive-green to black velvety spots on leaves and fruit, leading to defoliation and reduced fruit quality.", severity: "High" },
      { name: "Black Rot", description: "Caused by Botryosphaeria obtusa. Produces large brown rotting areas on fruit with concentric rings, and frogeye leaf spots.", severity: "High" },
      { name: "Cedar Apple Rust", description: "Caused by Gymnosporangium juniperi-virginianae. Produces bright orange-yellow spots on leaves and fruit, requiring both apple and cedar hosts.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure with no visible lesions or abnormalities.", severity: "Healthy" },
    ],
  },
  {
    plant: "Blueberry",
    emoji: "🫐",
    diseases: [
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Cherry (including sour)",
    emoji: "🍒",
    diseases: [
      { name: "Powdery Mildew", description: "Caused by Podosphaera clandestina. Produces white powdery coating on leaves, shoots, and fruit, stunting growth and reducing yield.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Corn (Maize)",
    emoji: "🌽",
    diseases: [
      { name: "Cercospora Leaf Spot / Gray Leaf Spot", description: "Caused by Cercospora zeae-maydis. Produces rectangular gray to tan lesions that run parallel to leaf veins, reducing photosynthetic area.", severity: "High" },
      { name: "Common Rust", description: "Caused by Puccinia sorghi. Produces small, circular to elongated brown pustules on both leaf surfaces, releasing powdery spores.", severity: "Medium" },
      { name: "Northern Leaf Blight", description: "Caused by Exserohilum turcicum. Produces large, cigar-shaped gray-green lesions on leaves, leading to significant yield loss.", severity: "High" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Grape",
    emoji: "🍇",
    diseases: [
      { name: "Black Rot", description: "Caused by Guignardia bidwellii. Produces brown circular lesions on leaves with dark margins, and causes fruit to shrivel into hard black mummies.", severity: "High" },
      { name: "Esca (Black Measles)", description: "A complex disease involving multiple fungi. Causes interveinal striping on leaves and dark spots on berries, potentially killing the vine.", severity: "High" },
      { name: "Leaf Blight (Isariopsis Leaf Spot)", description: "Produces angular brown spots on leaves bordered by veins, leading to premature defoliation in severe cases.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Orange",
    emoji: "🍊",
    diseases: [
      { name: "Huanglongbing (Citrus Greening)", description: "Caused by Candidatus Liberibacter bacteria, spread by psyllid insects. Produces blotchy mottling on leaves, lopsided bitter fruit, and eventually kills the tree. One of the most devastating citrus diseases worldwide.", severity: "High" },
    ],
  },
  {
    plant: "Peach",
    emoji: "🍑",
    diseases: [
      { name: "Bacterial Spot", description: "Caused by Xanthomonas arboricola. Produces small dark water-soaked lesions on leaves, which may fall out creating a shot-hole appearance, and pitted lesions on fruit.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Pepper (Bell)",
    emoji: "🫑",
    diseases: [
      { name: "Bacterial Spot", description: "Caused by Xanthomonas campestris. Produces small, dark, water-soaked spots on leaves and fruit that become raised and scabby, reducing marketability.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Potato",
    emoji: "🥔",
    diseases: [
      { name: "Early Blight", description: "Caused by Alternaria solani. Produces dark brown spots with concentric rings (target-board pattern) on older leaves, progressing upward.", severity: "Medium" },
      { name: "Late Blight", description: "Caused by Phytophthora infestans. Produces large, dark, water-soaked lesions on leaves with white fuzzy growth on undersides. Historically devastating — caused the Irish Potato Famine.", severity: "High" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Raspberry",
    emoji: "🫐",
    diseases: [
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Soybean",
    emoji: "🫘",
    diseases: [
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Squash",
    emoji: "🎃",
    diseases: [
      { name: "Powdery Mildew", description: "Caused by Podosphaera xanthii. Produces white powdery patches on leaf surfaces, reducing photosynthesis and weakening the plant.", severity: "Medium" },
    ],
  },
  {
    plant: "Strawberry",
    emoji: "🍓",
    diseases: [
      { name: "Leaf Scorch", description: "Caused by Diplocarpon earlianum. Produces numerous small dark purple spots on leaves that develop tan centers, leading to a scorched appearance.", severity: "Low" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Tomato",
    emoji: "🍅",
    diseases: [
      { name: "Bacterial Spot", description: "Caused by Xanthomonas species. Produces small, dark, water-soaked spots on leaves and fruit that become raised and scabby.", severity: "Medium" },
      { name: "Early Blight", description: "Caused by Alternaria solani. Produces dark brown spots with concentric rings on older leaves, potentially causing significant defoliation.", severity: "Medium" },
      { name: "Late Blight", description: "Caused by Phytophthora infestans. Produces large, dark water-soaked lesions with white fungal growth, spreading rapidly in cool, wet conditions.", severity: "High" },
      { name: "Leaf Mold", description: "Caused by Passalora fulva. Produces pale green to yellow spots on upper leaf surface with olive-green to brown velvety mold on lower surface.", severity: "Medium" },
      { name: "Septoria Leaf Spot", description: "Caused by Septoria lycopersici. Produces numerous small circular spots with dark borders and gray centers containing tiny black fruiting bodies.", severity: "Medium" },
      { name: "Spider Mites (Two-spotted)", description: "Caused by Tetranychus urticae. Tiny arachnids that feed on leaf cells producing stippling, yellowing, and fine webbing on leaf undersides.", severity: "Medium" },
      { name: "Target Spot", description: "Caused by Corynespora cassiicola. Produces large brown lesions with concentric rings and yellow halos, primarily on lower leaves.", severity: "Medium" },
      { name: "Yellow Leaf Curl Virus", description: "Transmitted by whiteflies. Causes severe leaf curling, yellowing, stunting, and flower drop, dramatically reducing fruit production.", severity: "High" },
      { name: "Tomato Mosaic Virus", description: "Spread mechanically through contact. Causes mottled light and dark green mosaic patterns on leaves, leaf distortion, and reduced fruit quality.", severity: "High" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
];

const severityConfig = {
  High: { color: "bg-destructive/10 text-destructive border-destructive/30", icon: AlertTriangle },
  Medium: { color: "bg-amber-500/10 text-amber-500 border-amber-500/30", icon: Bug },
  Low: { color: "bg-accent/10 text-accent border-accent/30", icon: Bug },
  Healthy: { color: "bg-success/10 text-success border-success/30", icon: ShieldCheck },
};

const DiseaseLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openPlants, setOpenPlants] = useState<string[]>([]);

  const togglePlant = (plant: string) => {
    setOpenPlants((prev) =>
      prev.includes(plant) ? prev.filter((p) => p !== plant) : [...prev, plant]
    );
  };

  const filteredPlants = plantData
    .map((p) => ({
      ...p,
      diseases: p.diseases.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.plant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((p) => p.diseases.length > 0);

  const totalDiseases = plantData.reduce((sum, p) => sum + p.diseases.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Disease Encyclopedia
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Plant Disease <span className="text-accent">Library</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Browse all {totalDiseases} conditions across {plantData.length} plant species 
              covered by the ADITI model, trained on the PlantVillage dataset.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search plants or diseases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* Plant Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredPlants.map((plant, i) => {
              const isOpen = openPlants.includes(plant.plant);
              const diseaseCount = plant.diseases.filter((d) => d.severity !== "Healthy").length;

              return (
                <motion.div
                  key={plant.plant}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  {/* Plant Header */}
                  <button
                    onClick={() => togglePlant(plant.plant)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      isOpen
                        ? "bg-card border-accent/40 shadow-md"
                        : "bg-card border-border hover:border-accent/20 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{plant.emoji}</span>
                      <div className="text-left">
                        <h3 className="font-bold text-foreground">{plant.plant}</h3>
                        <p className="text-xs text-muted-foreground">
                          {diseaseCount} disease{diseaseCount !== 1 ? "s" : ""} · {plant.diseases.length} total conditions
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Disease List Dropdown */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pr-2 pt-2 pb-1 space-y-2">
                          {plant.diseases.map((disease) => {
                            const config = severityConfig[disease.severity];
                            const Icon = config.icon;

                            return (
                              <div
                                key={disease.name}
                                className="flex gap-3 p-3 rounded-lg border border-border/50 bg-muted/30"
                              >
                                <div className="mt-0.5">
                                  <Icon className={`h-4 w-4 ${
                                    disease.severity === "Healthy" ? "text-success" : 
                                    disease.severity === "High" ? "text-destructive" : "text-amber-500"
                                  }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className="font-semibold text-sm text-foreground">{disease.name}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${config.color}`}>
                                      {disease.severity}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {disease.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {filteredPlants.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                No plants or diseases matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiseaseLibraryPage;
