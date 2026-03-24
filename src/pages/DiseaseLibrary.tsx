import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bug, ShieldCheck, AlertTriangle, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Disease {
  name: string;
  description: string;
  severity: "High" | "Medium" | "Low" | "Healthy";
}

interface PlantData {
  plant: string;
  icon: string;
  diseases: Disease[];
}

const plantData: PlantData[] = [
  {
    plant: "Apple",
    icon: "/apple.png",
    diseases: [
      { name: "Apple Scab", description: "Caused by Venturia inaequalis. Produces olive-green to black velvety spots on leaves and fruit, leading to defoliation and reduced fruit quality.", severity: "High" },
      { name: "Black Rot", description: "Caused by Botryosphaeria obtusa. Produces large brown rotting areas on fruit with concentric rings, and frogeye leaf spots.", severity: "High" },
      { name: "Cedar Apple Rust", description: "Caused by Gymnosporangium juniperi-virginianae. Produces bright orange-yellow spots on leaves and fruit, requiring both apple and cedar hosts.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure with no visible lesions or abnormalities.", severity: "Healthy" },
    ],
  },
  {
    plant: "Blueberry",
    icon: "/blueberry.png",
    diseases: [
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Cherry (including sour)",
    icon: "/cherry.png",
    diseases: [
      { name: "Powdery Mildew", description: "Caused by Podosphaera clandestina. Produces white powdery coating on leaves, shoots, and fruit, stunting growth and reducing yield.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Corn (Maize)",
    icon: "/corn.png",
    diseases: [
      { name: "Cercospora Leaf Spot / Gray Leaf Spot", description: "Caused by Cercospora zeae-maydis. Produces rectangular gray to tan lesions that run parallel to leaf veins, reducing photosynthetic area.", severity: "High" },
      { name: "Common Rust", description: "Caused by Puccinia sorghi. Produces small, circular to elongated brown pustules on both leaf surfaces, releasing powdery spores.", severity: "Medium" },
      { name: "Northern Leaf Blight", description: "Caused by Exserohilum turcicum. Produces large, cigar-shaped gray-green lesions on leaves, leading to significant yield loss.", severity: "High" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Grape",
    icon: "/grapes.png",
    diseases: [
      { name: "Black Rot", description: "Caused by Guignardia bidwellii. Produces brown circular lesions on leaves with dark margins, and causes fruit to shrivel into hard black mummies.", severity: "High" },
      { name: "Esca (Black Measles)", description: "A complex disease involving multiple fungi. Causes interveinal striping on leaves and dark spots on berries, potentially killing the vine.", severity: "High" },
      { name: "Leaf Blight (Isariopsis Leaf Spot)", description: "Produces angular brown spots on leaves bordered by veins, leading to premature defoliation in severe cases.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Orange",
    icon: "/orange.png",
    diseases: [
      { name: "Huanglongbing (Citrus Greening)", description: "Caused by Candidatus Liberibacter bacteria, spread by psyllid insects. Produces blotchy mottling on leaves, lopsided bitter fruit, and eventually kills the tree.", severity: "High" },
    ],
  },
  {
    plant: "Peach",
    icon: "/peach.png",
    diseases: [
      { name: "Bacterial Spot", description: "Caused by Xanthomonas arboricola. Produces small dark water-soaked lesions on leaves, which may fall out creating a shot-hole appearance, and pitted lesions on fruit.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Pepper (Bell)",
    icon: "/bell-pepper.png",
    diseases: [
      { name: "Bacterial Spot", description: "Caused by Xanthomonas campestris. Produces small, dark, water-soaked spots on leaves and fruit that become raised and scabby, reducing marketability.", severity: "Medium" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Potato",
    icon: "/potato.png",
    diseases: [
      { name: "Early Blight", description: "Caused by Alternaria solani. Produces dark brown spots with concentric rings (target-board pattern) on older leaves, progressing upward.", severity: "Medium" },
      { name: "Late Blight", description: "Caused by Phytophthora infestans. Produces large, dark, water-soaked lesions on leaves with white fuzzy growth on undersides. Historically devastating — caused the Irish Potato Famine.", severity: "High" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Raspberry",
    icon: "/raspberry.png",
    diseases: [
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Soybean",
    icon: "/soyabeans.png",
    diseases: [
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Squash",
    icon: "/squash.png",
    diseases: [
      { name: "Powdery Mildew", description: "Caused by Podosphaera xanthii. Produces white powdery patches on leaf surfaces, reducing photosynthesis and weakening the plant.", severity: "Medium" },
    ],
  },
  {
    plant: "Strawberry",
    icon: "/strawberry.png",
    diseases: [
      { name: "Leaf Scorch", description: "Caused by Diplocarpon earlianum. Produces numerous small dark purple spots on leaves that develop tan centers, leading to a scorched appearance.", severity: "Low" },
      { name: "Healthy", description: "No disease detected. The leaf shows normal color, texture, and structure.", severity: "Healthy" },
    ],
  },
  {
    plant: "Tomato",
    icon: "/tomato.png",
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

// Sort: fewest conditions first, most last
const sortedPlantData = [...plantData].sort((a, b) => a.diseases.length - b.diseases.length);

const severityConfig = {
  High:    { color: "bg-destructive/10 text-destructive border-destructive/30", icon: AlertTriangle },
  Medium:  { color: "bg-amber-500/10 text-amber-500 border-amber-500/30",       icon: Bug          },
  Low:     { color: "bg-accent/10 text-accent border-accent/30",                icon: Bug          },
  Healthy: { color: "bg-success/10 text-success border-success/30",             icon: ShieldCheck  },
};

// ── Disease popup modal ──────────────────────────────────────────────────────
function DiseaseModal({ plant, onClose }: { plant: PlantData; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const diseaseCount = plant.diseases.filter((d) => d.severity !== "Healthy").length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ duration: 0.22 }}
          className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-center gap-3 p-5 border-b border-border flex-shrink-0">
            <img src={plant.icon} alt={plant.plant} className="w-10 h-10 object-contain" />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-foreground text-lg leading-tight">{plant.plant}</h2>
              <p className="text-xs text-muted-foreground">
                {diseaseCount} disease{diseaseCount !== 1 ? "s" : ""} · {plant.diseases.length} total conditions
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable disease list */}
          <div className="overflow-y-auto flex-1 p-4 space-y-2">
            {plant.diseases.map((disease) => {
              const config = severityConfig[disease.severity];
              const Icon = config.icon;
              return (
                <div
                  key={disease.name}
                  className="flex gap-3 p-3 rounded-xl border border-border/50 bg-muted/30"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <Icon className={`h-4 w-4 ${
                      disease.severity === "Healthy"  ? "text-success"     :
                      disease.severity === "High"     ? "text-destructive" : "text-amber-500"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-foreground">{disease.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${config.color}`}>
                        {disease.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{disease.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
const DiseaseLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);

  const filteredPlants = sortedPlantData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.plant.toLowerCase().includes(q) ||
      p.diseases.some(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      )
    );
  });

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

          {/* Grid — 3 columns, sorted fewest→most conditions */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredPlants.map((plant, i) => {
                const diseaseCount = plant.diseases.filter((d) => d.severity !== "Healthy").length;
                const hasHighSeverity = plant.diseases.some((d) => d.severity === "High");

                return (
                  <motion.button
                    key={plant.plant}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    onClick={() => setSelectedPlant(plant)}
                    className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card hover:border-accent/40 hover:shadow-md transition-all duration-200 text-center cursor-pointer"
                  >
                    {/* Severity dot */}
                    {hasHighSeverity && (
                      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-destructive" title="Has high-severity disease" />
                    )}

                    <img
                      src={plant.icon}
                      alt={plant.plant}
                      className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                    <div>
                      <h3 className="font-bold text-foreground text-sm leading-tight mb-1">{plant.plant}</h3>
                      <p className="text-xs text-muted-foreground">
                        {diseaseCount > 0
                          ? `${diseaseCount} disease${diseaseCount !== 1 ? "s" : ""}`
                          : "Healthy only"}
                        {" · "}
                        {plant.diseases.length} condition{plant.diseases.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* Severity pills */}
                    <div className="flex flex-wrap justify-center gap-1">
                      {Array.from(new Set(plant.diseases.map((d) => d.severity))).map((sev) => (
                        <span
                          key={sev}
                          className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${severityConfig[sev].color}`}
                        >
                          {sev}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {filteredPlants.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                No plants or diseases matching &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Disease popup */}
      {selectedPlant && (
        <DiseaseModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
      )}

      <Footer />
    </div>
  );
};

export default DiseaseLibraryPage;
