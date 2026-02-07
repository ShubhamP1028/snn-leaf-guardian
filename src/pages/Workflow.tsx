import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Camera, Cpu, Zap, FileCheck, ArrowDown, Database, BarChart3, Shield } from "lucide-react";

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
    description: "The image undergoes normalization to [0,1] range, followed by data augmentation including random rotation, brightness adjustment, and horizontal flipping to improve model robustness.",
    tech: "Normalize [0,1] + Augmentation",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Zap,
    title: "3. Spike Encoding",
    description: "Pixel intensities are converted into Bernoulli spike trains over T=25 timesteps. Each pixel generates a binary spike (0 or 1) at each timestep with probability equal to its normalized intensity.",
    tech: "Bernoulli(pixel_intensity) → {0,1}^T",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Cpu,
    title: "4. SNN Forward Pass",
    description: "The spike trains pass through 4 layers of Leaky Integrate-and-Fire (LIF) neurons (256→128→64→38). Each neuron accumulates incoming spikes into membrane potential and fires when threshold is reached.",
    tech: "V(t) = V(t-1) + I(t) − V(t-1)/τ",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "5. Spike Decoding",
    description: "Output spikes are counted over all T timesteps for each of the 38 output neurons. These spike counts are normalized via softmax to produce probability scores for each disease class.",
    tech: "Spike Count → Softmax Probabilities",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileCheck,
    title: "6. Diagnosis Output",
    description: "The system outputs the predicted disease class with confidence score, along with detailed treatment recommendations and care instructions in the farmer's preferred language.",
    tech: "Disease Class + Confidence + Treatment Plan",
    color: "bg-success/10 text-success",
  },
];

const optimizations = [
  {
    icon: Zap,
    title: "Cython Optimization",
    description: "Critical computation loops are compiled to C via Cython, achieving 5-10x speedup over pure Python for spike generation and LIF neuron updates.",
  },
  {
    icon: Shield,
    title: "Edge Deployment",
    description: "The optimized model runs entirely on-device—no cloud connection required. Compatible with Raspberry Pi, Android smartphones, and neuromorphic hardware.",
  },
  {
    icon: BarChart3,
    title: "Energy Efficiency",
    description: "SNNs only compute when spikes occur (event-driven), consuming 10x less energy than equivalent CNNs. Ideal for battery-powered field devices.",
  },
];

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
              How Project A.D.I.T.I. Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From a simple leaf photo to an accurate disease diagnosis in under 10 milliseconds — 
              here's the complete end-to-end pipeline powered by Spiking Neural Networks.
            </p>
          </motion.div>
        </section>

        {/* Pipeline Steps */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto space-y-2">
            {pipeline.map((step, index) => (
              <div key={step.title}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                      <code className="text-xs font-mono px-3 py-1.5 rounded-lg bg-muted text-muted-foreground">
                        {step.tech}
                      </code>
                    </div>
                  </div>
                </motion.div>
                {index < pipeline.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Optimizations */}
        <section className="section-padding bg-surface-2">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Optimizations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                What makes our approach production-ready for real-world agricultural deployment.
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
