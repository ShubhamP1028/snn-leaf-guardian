import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Camera, Cpu, Zap, FileCheck, Database, BarChart3, Shield, Layers, Maximize2, ArrowDown } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";

const pipeline = [
  {
    icon: Camera,
    title: "1. Image Acquisition",
    description: "The farmer captures a photo of the affected plant leaf using a smartphone camera. The system accepts RGB images and standardizes them to 224×224×3 resolution.",
    tech: "Input: RGB 224×224×3",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Database,
    title: "2. Preprocessing & Augmentation",
    description: "The image undergoes normalization to [0,1] range, followed by data augmentation — random rotation, brightness adjustment, and horizontal flipping — to improve model robustness across field conditions.",
    tech: "Normalize [0,1] + Augmentation",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Layers,
    title: "3. CNN Feature Extraction",
    description: "A pretrained ResNet-based CNN backbone extracts rich spatial feature maps from the leaf image. Convolutional layers detect edges, textures, and disease-specific visual patterns across multiple scales, producing a compact feature vector.",
    tech: "ResNet Backbone → Feature Vector (512-d)",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Zap,
    title: "4. Spike Encoding",
    description: "The CNN feature vector is converted into Bernoulli spike trains over T=25 timesteps. Each feature dimension generates a binary spike (0 or 1) at each timestep with probability proportional to its activation magnitude.",
    tech: "Bernoulli(feature_activation) → {0,1}^T",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Cpu,
    title: "5. SNN Classification",
    description: "Spike trains pass through Leaky Integrate-and-Fire (LIF) neuron layers (512→256→128→38). Each neuron accumulates incoming spikes into membrane potential and fires when the threshold is crossed, mimicking biological neural dynamics.",
    tech: "V(t) = βV(t-1) + I(t);  fire if V(t) ≥ θ",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BarChart3,
    title: "6. Spike Decoding",
    description: "Output spikes are accumulated over all T timesteps for each of the 38 output neurons. Spike counts are normalized via softmax to produce calibrated probability scores per disease class.",
    tech: "Spike Count → Softmax Probabilities",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileCheck,
    title: "7. Diagnosis Output",
    description: "The system returns the predicted disease class with a confidence score, along with treatment recommendations and care instructions — helping farmers take immediate, informed action.",
    tech: "Disease Class + Confidence + Treatment Plan",
    color: "bg-success/10 text-success",
  },
];

const optimizations = [
  {
    icon: Zap,
    title: "Hybrid CNN-SNN Design",
    description: "The CNN backbone handles spatial feature extraction where it excels, while the SNN handles temporal classification — combining the accuracy of deep learning with the energy efficiency of neuromorphic computing.",
  },
  {
    icon: Shield,
    title: "Edge Deployment",
    description: "The optimized model runs entirely on-device — no cloud connection required. Compatible with Raspberry Pi, Android smartphones, and neuromorphic hardware like Intel Loihi.",
  },
  {
    icon: BarChart3,
    title: "Energy Efficiency",
    description: "SNNs are event-driven — neurons only compute when spikes occur. This results in up to 10× lower energy consumption compared to equivalent CNN-only models, ideal for battery-powered field devices.",
  },
];

function ClickableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative group cursor-zoom-in rounded-xl overflow-hidden" onClick={() => setOpen(true)}>
        <img src={src} alt={alt} className="w-full h-auto object-contain rounded-xl" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>
      </div>
      {open && <ImageLightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

const Workflow = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">

        {/* Hero */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Technical Workflow
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How Project ADITI Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From a simple leaf photo to an accurate disease diagnosis — powered by a CNN-SNN hybrid architecture
              that combines deep feature extraction with biologically-inspired spiking neural networks.
            </p>
          </motion.div>
        </section>

        {/* Architecture Diagram */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Model Architecture</h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                The CNN backbone extracts spatial features from the leaf image, which are then encoded as spike trains
                and classified by the SNN layers — combining the representational power of CNNs with the temporal
                dynamics and energy efficiency of spiking neurons.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden p-4">
              <ClickableImage src="/CNN_SNN_hybrid_model_architecture.jpg" alt="CNN-SNN Hybrid Model Architecture" />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">Click image to expand</p>
          </motion.div>
        </section>

        {/* Pipeline — zigzag */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">End-to-End Pipeline</h2>
            <p className="text-muted-foreground text-sm">Step-by-step breakdown of how a leaf image becomes a diagnosis.</p>
          </motion.div>

          {/* Central spine + zigzag cards */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical centre line — hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            <div className="space-y-0">
              {pipeline.map((step, index) => {
                const isLeft = index % 2 === 0; // even → card on left, odd → card on right
                return (
                  <div key={step.title} className="relative">
                    {/* Row */}
                    <div className={`flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"} md:gap-0`}>

                      {/* Card — takes up ~45% width on desktop */}
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.07 }}
                        className="w-full md:w-[45%] p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-11 h-11 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                            <step.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-foreground mb-1 text-sm md:text-base">{step.title}</h3>
                            <p className="text-muted-foreground text-xs mb-2 leading-relaxed">{step.description}</p>
                            <code className="text-[10px] font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground break-all">
                              {step.tech}
                            </code>
                          </div>
                        </div>
                      </motion.div>

                      {/* Centre dot + connector — desktop only */}
                      <div className="hidden md:flex w-[10%] flex-col items-center relative">
                        <div className="w-4 h-4 rounded-full bg-accent border-2 border-background shadow-md z-10" />
                      </div>

                      {/* Spacer on the opposite side — desktop only */}
                      <div className="hidden md:block w-[45%]" />
                    </div>

                    {/* Arrow between steps — mobile: centred, desktop: on the spine */}
                    {index < pipeline.length - 1 && (
                      <div className="flex justify-center md:justify-center py-2">
                        <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Advantages */}
        <section className="section-padding bg-surface-2">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Advantages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                What makes the CNN-SNN hybrid approach production-ready for real-world agricultural deployment.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {optimizations.map((opt, index) => (
                <motion.div
                  key={opt.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <opt.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{opt.title}</h3>
                  <p className="text-muted-foreground text-sm">{opt.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Workflow;
