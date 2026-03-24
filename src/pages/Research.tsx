import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FlaskConical, Zap, Brain, Activity, Maximize2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageLightbox } from "@/components/ImageLightbox";

type ModelSection = "lif" | "bptt" | "stdp";

const sections: { id: ModelSection; label: string; icon: React.ElementType; color: string }[] = [
  { id: "lif",  label: "LIF — Leaky Integrate-and-Fire",            icon: Zap,      color: "text-blue-500"    },
  { id: "bptt", label: "BPTT — CNN-SNN Hybrid (Izhikevich)",        icon: Brain,    color: "text-emerald-500" },
  { id: "stdp", label: "STDP — Spike-Timing Dependent Plasticity",  icon: Activity, color: "text-violet-500"  },
];

const content = {
  lif: {
    badge: "Phase 1 · Baseline SNN",
    title: "LIF Spiking Neural Network",
    subtitle: "Pure spiking classification using Leaky Integrate-and-Fire neurons via snnTorch",
    overview: `The first model in Project ADITI's research pipeline is a pure Spiking Neural Network built entirely with Leaky Integrate-and-Fire (LIF) neurons using the snnTorch library. This served as the foundational baseline to validate that biologically-inspired neural dynamics could be applied to the 38-class PlantVillage disease classification task.`,
    architecture: {
      image: "/LIF_snn_architecture.png",
      caption: "LIF SNN architecture — fully connected spiking layers with Bernoulli spike encoding",
      description: `The model encodes input images (224×224 RGB) by normalizing pixel intensities to [0,1] and converting them into Bernoulli spike trains over T=25 timesteps. Each pixel fires a binary spike at each timestep with probability equal to its normalized intensity. The spike trains then pass through four fully-connected LIF neuron layers (256→128→64→38). Each LIF neuron accumulates incoming spikes into a membrane potential and fires when the threshold is crossed, after which the potential leaks back toward rest. Output spike counts over all timesteps are decoded via softmax to produce class probabilities.`,
    },
    details: [
      { label: "Framework",      value: "snnTorch 0.9.4 + PyTorch" },
      { label: "Neuron Model",   value: "Leaky Integrate-and-Fire (LIF)" },
      { label: "Spike Encoding", value: "Bernoulli rate coding — T=25 timesteps" },
      { label: "Architecture",   value: "FC: 256 → 128 → 64 → 38 LIF layers" },
      { label: "Spike Decoding", value: "Spike count → Softmax probabilities" },
      { label: "Dataset",        value: "PlantVillage (38 classes, color images)" },
      { label: "Loss Function",  value: "Cross-entropy on spike-count logits" },
    ],
    evalImages: [
      { src: "/LIF_snn_gradientplot.png", caption: "Loss & accuracy curves across training epochs" },
    ],
    insight: `The LIF model demonstrated that pure SNNs can learn meaningful representations from plant disease images. However, the fully-connected architecture struggled to capture the rich spatial features present in leaf images, motivating the move to a CNN-SNN hybrid in the next phase.`,
  },

  bptt: {
    badge: "Phase 2 · CNN-SNN Hybrid",
    title: "BPTT CNN-SNN Hybrid with Izhikevich Neurons",
    subtitle: "ResNet CNN feature extraction combined with biologically-realistic Izhikevich spiking classification",
    overview: `The second model introduces a CNN-SNN hybrid architecture trained end-to-end using Backpropagation Through Time (BPTT). A pretrained ResNet CNN backbone extracts rich spatial feature maps from leaf images, which are then encoded as spike trains and classified by layers of Izhikevich neurons. This approach combines the representational power of deep convolutional networks with the temporal dynamics and energy efficiency of spiking neural networks.`,
    architecture: {
      image: "/CNN_SNN_hybrid_model_architecture.jpg",
      caption: "CNN-SNN hybrid architecture — ResNet backbone feeding Izhikevich SNN classifier",
      description: `The pipeline begins with a ResNet-based CNN backbone that produces a 512-dimensional feature vector from the 128×128 input image. This vector is projected to 256 dimensions and encoded as Bernoulli spike trains over T=8 timesteps. The spike trains then pass through Izhikevich neuron layers (256→128→38). Five biologically-distinct Izhikevich neuron types are explored: Regular Spiking (RS), Fast Spiking (FS), Chattering (CH), Intrinsic Bursting (IB), and Low Threshold Spiking (LTS). Gradients flow through the non-differentiable spike threshold via the SuperSpike surrogate gradient, enabling end-to-end BPTT training. The Norse library provides the Izhikevich dynamics framework.`,
    },
    details: [
      { label: "Framework",      value: "Norse + PyTorch (BPTT with SuperSpike surrogate)" },
      { label: "CNN Backbone",   value: "ResNet (pretrained) → 512-d feature vector" },
      { label: "Neuron Model",   value: "Izhikevich (RS, FS, CH, IB, LTS variants)" },
      { label: "Spike Encoding", value: "Bernoulli rate coding — T=8 timesteps" },
      { label: "SNN Layers",     value: "256 → 128 → 38 Izhikevich layers" },
      { label: "Surrogate Grad", value: "SuperSpike: 1/(1+|v−v_th|)²" },
      { label: "Optimizer",      value: "Adam (lr=3e-4, weight decay=1e-4)" },
      { label: "Dataset",        value: "PlantVillage 35% subset, 128×128, 25 epochs" },
    ],
    evalImages: [
      { src: "/BPTT_gradient_analysis.png",      caption: "Gradient flow analysis across SNN layers" },
      { src: "/BPTT_snn_training_dashboard.png", caption: "Training dashboard — loss & accuracy per neuron type" },
      { src: "/BPTT_spike_patterns.png",         caption: "Izhikevich neuron spike patterns (RS, FS, CH, IB, LTS)" },
      { src: "/BPTT_final_comparison.png",       caption: "Final accuracy comparison across all five neuron types" },
    ],
    insight: `The Chattering (CH) neuron type — the only Izhikevich variant discovered specifically in the visual cortex — achieved the best classification accuracy. Its burst-silence rhythm acts as a built-in attention gate, firing strongly for high-salience disease regions and remaining silent for uniform healthy background, directly mirroring the spatial segmentation computations performed by primate V1/V2 neurons.`,
  },

  stdp: {
    badge: "Phase 3 · Unsupervised Learning",
    title: "STDP — Spike-Timing Dependent Plasticity",
    subtitle: "Biologically-plausible unsupervised learning via Hebbian spike-timing rules",
    overview: `The third model explores Spike-Timing Dependent Plasticity (STDP), a biologically-plausible unsupervised learning rule inspired by how real synapses strengthen or weaken based on the relative timing of pre- and post-synaptic spikes. This model uses the same CNN-SNN hybrid architecture with Izhikevich neurons (via SpikingJelly), but replaces BPTT with local STDP weight updates — moving toward neuromorphic hardware compatibility and energy-efficient on-device learning.`,
    architecture: {
      image: "/STDP_model_architecture.png",
      caption: "STDP model architecture — CNN backbone with STDP-trained Izhikevich SNN layers",
      description: `The architecture mirrors the BPTT hybrid: a ResNet CNN backbone extracts a 512-d feature vector, projected to ENC_DIM=256 and encoded as spike trains over T=8 timesteps. The SNN classifier uses Izhikevich neurons (implemented via SpikingJelly's MemoryModule) across five canonical types: RS, FS, CH, IB, and LTS. Instead of backpropagating gradients, STDP updates synaptic weights based on the timing difference between pre- and post-synaptic spikes — potentiating synapses where the pre-synaptic neuron fires before the post-synaptic neuron (causal), and depressing those where the order is reversed.`,
    },
    details: [
      { label: "Framework",      value: "SpikingJelly + PyTorch" },
      { label: "CNN Backbone",   value: "ResNet → 512-d → ENC_DIM=256 projection" },
      { label: "Neuron Model",   value: "Izhikevich (RS, FS, CH, IB, LTS) via SpikingJelly" },
      { label: "Learning Rule",  value: "STDP — Hebbian spike-timing plasticity" },
      { label: "Spike Encoding", value: "Bernoulli rate coding — T=8 timesteps" },
      { label: "Surrogate Grad", value: "ATan surrogate (SpikingJelly built-in)" },
      { label: "Neuron Reset",   value: "Soft reset: v←c, u←u+d at spike sites" },
      { label: "Dataset",        value: "PlantVillage 35% subset, 128×128, 25 epochs" },
    ],
    evalImages: [
      { src: "/STDP-GradientPlot.png",     caption: "Gradient analysis — STDP weight update dynamics" },
      { src: "/STDP_Dashboard.png",        caption: "Training dashboard — STDP learning curves" },
      { src: "/STDP_final_comparison.png", caption: "Final accuracy comparison across neuron types under STDP" },
    ],
    insight: `STDP introduces fully local, biologically-plausible weight updates that require no global error signal — a key step toward neuromorphic hardware deployment. While STDP accuracy trails BPTT in supervised settings, it enables continual on-device learning without retraining from scratch, making it highly relevant for edge agricultural sensors that must adapt to new disease variants in the field.`,
  },
};

function ClickableImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`relative group cursor-zoom-in overflow-hidden ${className ?? ""}`}
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className="w-full h-full object-contain" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <Maximize2 className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>
      </div>
      {open && <ImageLightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

const ResearchPage = () => {
  const [openSection, setOpenSection] = useState<ModelSection | null>("lif");

  const toggle = (id: ModelSection) =>
    setOpenSection((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <FlaskConical className="h-4 w-4" />
              Research Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
              Model  <span className="text-accent">Development Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Project ADITI evolved through three distinct phases of neuromorphic model development —
              from a pure LIF baseline to a biologically-realistic CNN-SNN hybrid, culminating in
              unsupervised STDP-based learning for edge deployment.
            </p>
          </motion.div>
        </section>

        {/* Phase Cards */}
        <section className="container mx-auto px-4 max-w-4xl space-y-4">
          {sections.map((sec, i) => {
            const isOpen = openSection === sec.id;
            const data = content[sec.id];
            const Icon = sec.icon;

            return (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggle(sec.id)}
                  className={`w-full flex items-center justify-between p-5 transition-colors ${
                    isOpen ? "bg-accent/5 border-b border-border" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${sec.color}`} />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-medium text-muted-foreground block mb-0.5">{data.badge}</span>
                      <h2 className="font-bold text-foreground text-base">{sec.label}</h2>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Section Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-8">
                        {/* Title + Overview */}
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{data.title}</h3>
                          <p className="text-sm text-accent font-medium mb-4">{data.subtitle}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{data.overview}</p>
                        </div>

                        {/* Architecture */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-base">Architecture</h4>
                          <div className="rounded-xl border border-border bg-muted/20 overflow-hidden mb-3">
                            <ClickableImage
                              src={data.architecture.image}
                              alt={data.architecture.caption}
                              className="max-h-[480px]"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground text-center italic mb-4">
                            {data.architecture.caption} · click to expand
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {data.architecture.description}
                          </p>
                        </div>

                        {/* Technical Details */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-base">Technical Details</h4>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {data.details.map((d) => (
                              <div
                                key={d.label}
                                className="flex gap-2 p-3 rounded-lg bg-muted/30 border border-border/50"
                              >
                                <span className="text-xs font-semibold text-muted-foreground min-w-[110px]">
                                  {d.label}
                                </span>
                                <span className="text-xs text-foreground font-mono">{d.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Evaluation Plots */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-base">Evaluation Results</h4>
                          <div className={`grid gap-4 ${data.evalImages.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                            {data.evalImages.map((img) => (
                              <div key={img.src} className="space-y-1">
                                <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
                                  <ClickableImage
                                    src={img.src}
                                    alt={img.caption}
                                    className="h-52"
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground text-center italic">{img.caption}</p>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Click any image to expand
                          </p>
                        </div>

                        {/* Key Insight */}
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Key Insight</p>
                          <p className="text-sm text-foreground leading-relaxed">{data.insight}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPage;
