import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Image as ImageIcon, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResult {
  disease: string;
  confidence: number;
  isHealthy: boolean;
  description: string;
  treatment: string[];
}

const mockResults: AnalysisResult[] = [
  {
    disease: "Tomato Late Blight",
    confidence: 94.7,
    isHealthy: false,
    description: "A serious disease caused by Phytophthora infestans. It affects leaves, stems, and fruits, causing dark water-soaked lesions.",
    treatment: [
      "Remove and destroy affected plant parts immediately",
      "Apply copper-based fungicide",
      "Improve air circulation around plants",
      "Water at the base, not on foliage"
    ]
  },
  {
    disease: "Healthy Plant",
    confidence: 98.2,
    isHealthy: true,
    description: "Your plant appears to be healthy with no visible signs of disease. Keep up the good care!",
    treatment: [
      "Continue regular watering schedule",
      "Maintain proper nutrition",
      "Monitor for early signs of stress"
    ]
  }
];

export function ImageUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(mockResults[Math.random() > 0.5 ? 0 : 1]);
    }, 2500);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <section id="features" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scan Your Plant
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload or capture a photo of your plant's leaf. Our SNN-powered AI will analyze it 
            and detect any diseases in milliseconds.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Upload Zone - White card with shadow */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden bg-card shadow-lg ${
                isDragging
                  ? "border-accent tech-glow bg-accent/5"
                  : uploadedImage
                  ? "border-primary bg-card"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <AnimatePresence mode="wait">
                {!uploadedImage ? (
                  <motion.label
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-8 min-h-[320px] cursor-pointer"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4"
                    >
                      <Upload className="h-8 w-8 text-accent" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Drop your image here
                    </h3>
                    <p className="text-muted-foreground text-sm text-center mb-4">
                      or click to browse
                    </p>
                    <div className="flex gap-3">
                      <Button variant="default" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Browse
                      </Button>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Camera
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-xs mt-4">
                      Supports: JPG, PNG, WEBP (Max 10MB)
                    </p>
                  </motion.label>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative min-h-[320px]"
                  >
                    <img
                      src={uploadedImage}
                      alt="Uploaded plant"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Scanning Animation - Accent colored */}
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-accent/10">
                        <motion.div
                          className="absolute left-0 right-0 h-1 bg-accent shadow-[0_0_20px_hsl(209,100%,50%)]"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    )}

                    {/* Reset Button */}
                    <button
                      onClick={resetUpload}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-md"
                    >
                      <X className="h-4 w-4 text-foreground" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Panel - White card with shadow */}
            <div className="rounded-2xl border border-border bg-card p-6 min-h-[320px] flex flex-col shadow-lg">
              <AnimatePresence mode="wait">
                {!uploadedImage && !result && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Analysis Results
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Upload an image to see detection results
                    </p>
                  </motion.div>
                )}

                {isAnalyzing && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <Loader2 className="h-12 w-12 text-accent animate-spin mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Analyzing Image...
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      SNN inference in progress
                    </p>
                    <div className="mt-4 flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-accent"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {result && !isAnalyzing && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full"
                  >
                    {/* Status Header */}
                    <div className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${
                      result.isHealthy ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      {result.isHealthy ? (
                        <CheckCircle2 className="h-8 w-8 text-success" />
                      ) : (
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                      )}
                      <div>
                        <h3 className="font-bold text-foreground">
                          {result.disease}
                        </h3>
                        <p className={`text-sm font-mono font-medium ${
                          result.isHealthy ? "text-success" : "text-destructive"
                        }`}>
                          {result.confidence}% Confidence
                        </p>
                      </div>
                    </div>

                    {/* Confidence Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Confidence Level</span>
                        <span className="font-mono font-medium text-foreground">{result.confidence}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            result.isHealthy ? "bg-success" : "bg-destructive"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                      {result.description}
                    </p>

                    {/* Treatment */}
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-2">
                        {result.isHealthy ? "Care Tips:" : "Recommended Actions:"}
                      </h4>
                      <ul className="space-y-1">
                        {result.treatment.slice(0, 3).map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
