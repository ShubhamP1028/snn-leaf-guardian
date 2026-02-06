import { motion } from "framer-motion";
import { Camera, Cpu, Zap, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Capture",
    description: "Take a photo of the affected plant leaf using your smartphone camera or upload an existing image.",
  },
  {
    icon: Cpu,
    title: "SNN Processing",
    description: "Image is encoded into spike trains and processed by our Leaky Integrate-and-Fire neural network.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "In under 10ms, our model analyzes temporal spike patterns to detect disease signatures.",
  },
  {
    icon: FileCheck,
    title: "Get Results",
    description: "Receive detailed diagnosis with confidence scores, disease info, and treatment recommendations.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-surface-2 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            The Technology
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powered by 3rd-generation Spiking Neural Networks, our system mimics biological neurons 
            for ultra-efficient, edge-ready disease detection.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Icon */}
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center relative z-10 shadow-lg"
                  >
                    <step.icon className="h-7 w-7 text-accent-foreground" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SNN Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-3xl bg-card border border-border shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Spiking Neural Network Architecture
            </h3>
            <p className="text-muted-foreground text-sm">
              LIF neurons with temporal spike pattern encoding
            </p>
          </div>

          {/* Architecture Visualization */}
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {/* Input Layer */}
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-2 font-medium">Input</div>
              <div className="flex flex-col gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`input-${i}`}
                    className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-2">224×224×3</div>
            </div>

            {/* Arrow */}
            <div className="text-accent font-bold">→</div>

            {/* Hidden Layers */}
            {[256, 128, 64].map((neurons, layerIdx) => (
              <div key={layerIdx} className="flex flex-col items-center">
                <div className="text-xs text-muted-foreground mb-2 font-medium">
                  Layer {layerIdx + 1}
                </div>
                <div className="flex flex-col gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`layer-${layerIdx}-${i}`}
                      className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        backgroundColor: ["hsl(209 100% 50% / 0.2)", "hsl(209 100% 50% / 0.5)", "hsl(209 100% 50% / 0.2)"]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: Infinity, 
                        delay: layerIdx * 0.3 + i * 0.1,
                        repeatDelay: 2
                      }}
                    >
                      <Zap className="w-3 h-3 text-accent" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-xs font-mono text-muted-foreground mt-2">{neurons} LIF</div>
              </div>
            ))}

            {/* Arrow */}
            <div className="text-accent font-bold">→</div>

            {/* Output */}
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-2 font-medium">Output</div>
              <div className="w-12 h-12 rounded-xl bg-success/20 border border-success/40 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-success" />
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-2">38 Classes</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
