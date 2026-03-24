import { motion } from "framer-motion";
import { Zap, Brain, Activity, TrendingUp, Award, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const models = [
  {
    phase: "Phase 1",
    icon: Zap,
    name: "LIF — Baseline SNN",
    framework: "snnTorch",
    neuron: "Leaky Integrate-and-Fire",
    accuracy: "82%",
    topAccuracy: null as string | null,
    color: "border-blue-500/30 bg-blue-500/5",
    iconColor: "text-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-600",
    dotColor: "bg-blue-500",
    highlights: [
      "Pure SNN — no CNN backbone",
      "Bernoulli encoding, T=25 steps",
      "FC layers: 256→128→64→38",
      "Proof-of-concept baseline",
    ],
    insight:
      "Validated that LIF neurons can learn disease patterns, but fully-connected architecture limits spatial feature capture.",
  },
  {
    phase: "Phase 2",
    icon: Brain,
    name: "BPTT — CNN-SNN Hybrid",
    framework: "Norse + PyTorch",
    neuron: "Izhikevich (5 types)",
    accuracy: "97.7%",
    topAccuracy: "CH neuron: best performer",
    color: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "text-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-600",
    dotColor: "bg-emerald-500",
    highlights: [
      "ResNet backbone → 512-d features",
      "5 Izhikevich neuron types tested",
      "SuperSpike surrogate gradient",
      "End-to-end BPTT training",
    ],
    insight:
      "Chattering (CH) neurons — visual cortex specialists — achieved best accuracy via burst-silence attention gating on disease regions.",
  },
  {
    phase: "Phase 3",
    icon: Activity,
    name: "STDP — Unsupervised",
    framework: "SpikingJelly + PyTorch",
    neuron: "Izhikevich (SpikingJelly)",
    accuracy: "98.8%",
    topAccuracy: "Regular Spiking & Intrinsic Burst Spiking",
    color: "border-violet-500/30 bg-violet-500/5",
    iconColor: "text-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-600",
    dotColor: "bg-violet-500",
    highlights: [
      "Local Hebbian STDP weight updates",
      "No backpropagation required",
      "ATan surrogate gradient",
      "Neuromorphic hardware ready",
    ],
    insight:
      "Fully local learning enables continual on-device adaptation — critical for edge sensors that must learn new disease variants in the field.",
  },
];

const overallStats = [
  { icon: TrendingUp, value: "38",   label: "Disease Classes",   sub: "PlantVillage dataset"  },
  { icon: Award,      value: "~98%", label: "Peak Accuracy",     sub: "STDP + RS neurons"     },
  { icon: Cpu,        value: "10×",  label: "Energy Reduction",  sub: "vs. equivalent CNN"    },
  { icon: Zap,        value: "3",    label: "Model Generations", sub: "LIF → BPTT → STDP"    },
];

export function ImpactSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Model Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Research Results &amp; <span className="text-accent">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three generations of neuromorphic models — each building on the last to push accuracy,
            biological realism, and edge-deployment readiness.
          </p>
        </motion.div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-4xl mx-auto">
          {overallStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center p-5 rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 mb-3">
                <stat.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground font-mono mb-0.5">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-0.5">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Model Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {models.map((model, i) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`rounded-2xl border p-6 ${model.color} flex flex-col gap-4`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-background/60 flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${model.iconColor}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${model.badgeColor}`}>
                        {model.phase}
                      </span>
                      <h3 className="font-bold text-foreground text-sm mt-1">{model.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground font-mono">{model.accuracy}</div>
                    <div className="text-xs text-muted-foreground">accuracy</div>
                  </div>
                </div>

                {/* Meta */}
                <div className="space-y-1">
                  <div className="flex gap-2 text-xs">
                    <span className="text-muted-foreground min-w-[64px]">Framework</span>
                    <span className="text-foreground font-mono">{model.framework}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-muted-foreground min-w-[64px]">Neuron</span>
                    <span className="text-foreground font-mono">{model.neuron}</span>
                  </div>
                  {model.topAccuracy && (
                    <div className="flex gap-2 text-xs">
                      <span className="text-muted-foreground min-w-[64px]">Best</span>
                      <span className="text-foreground font-mono">{model.topAccuracy}</span>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                <ul className="space-y-1">
                  {model.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${model.dotColor}`} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Insight */}
                <p className="text-xs text-foreground/80 leading-relaxed border-t border-border/50 pt-3 mt-auto">
                  {model.insight}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/research"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors shadow-sm"
          >
            Explore Full Research
            <TrendingUp className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
