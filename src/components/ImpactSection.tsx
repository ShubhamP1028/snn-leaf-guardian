import { motion } from "framer-motion";
import { Users, TrendingUp, Leaf, Smartphone } from "lucide-react";

const impacts = [
  {
    icon: Users,
    value: "120M+",
    label: "Target Farmers",
    description: "Smallholder farmers across India",
  },
  {
    icon: TrendingUp,
    value: "₹2.5L Cr",
    label: "Annual Loss",
    description: "Preventable crop disease losses",
  },
  {
    icon: Leaf,
    value: "40%",
    label: "Yield Loss",
    description: "Reduced through early detection",
  },
  {
    icon: Smartphone,
    value: "Offline",
    label: "Capability",
    description: "Works without internet",
  },
];

export function ImpactSection() {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built for Impact
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Designed specifically for the needs of Indian smallholder farmers—
            accessible, affordable, and effective.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-4">
                <impact.icon className="h-7 w-7 text-white" />
              </div>
              <div className="font-mono text-3xl font-bold text-white mb-1">
                {impact.value}
              </div>
              <div className="text-white font-medium mb-1">
                {impact.label}
              </div>
              <p className="text-white/70 text-sm">
                {impact.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
