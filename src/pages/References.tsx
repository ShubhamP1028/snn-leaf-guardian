import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalLink, BookOpen, Database, Cpu, Code } from "lucide-react";

const referenceCategories = [
  {
    title: "Research Papers",
    icon: BookOpen,
    refs: [
      {
        title: "Behavior of Spikes in Spiking Neural Network (SNN) Model with Bernoulli for Plant Disease on Leaves.",
        authors: "Gul Urfa, Gul M. Junaid, Choi Gyu Sang",
        venue: "Computers, Materials & Continua,2025",
        link: "https://search.ebscohost.com/login.aspx?direct=true&profile=ehost&scope=site&authtype=crawler&jrnl=15462218&AN=186532446&h=thPfmttRFvTj5I9gAIDf%2BtMlEr0RxIAAfDl00JaVJ%2FdUF%2BMUR7nZcGCjbiabr%2BnulQ2LN8vMJ5tQYfNfh1Us5Q%3D%3D&crl=c",
        description: "Used a comprehensive dataset of 87,000 RGB images of plant leaves, which included 38 distinct classes of healthy and unhealthy leaves. To train and evaluate three distinct neural network architectures, DeepSNN, SimpleCNN, and SimpleFCNN, the dataset was rigorously preprocessed, including stochastic rotation, horizontal flip, resizing, and normalization.",
      },
      {
        title: "Innovative solutions for plant disease identification: Leveraging DCoS-WOR and spiking neural networks",
        authors: "Piriyadharshini Singaravelu , Ezhilarasi Perumal",
        venue: "Expert Systems with Applications, 2025",
        link: "https://doi.org/10.1016/j.eswa.2025.127399",
        description: "Differential Deep Convolutional Spiking Neural Networks (D-DCSNN): D-DCSNN stands apart from regular SNNs because this version has a differential mechanism for spiking neuron spikes up to full capability. The DCoS-WOR model achieves higher energy efficiency due to its enhanced capability to handle noisy data while maintaining stable operation which greatly benefits from dealing with real-world plant disease detection conditions.",
      },
      {
        title: "PlantVillage: Identifying Plant Diseases Using Deep Learning",
        authors: "Mohanty, S.P., Hughes, D.P. & Salathé, M.",
        venue: "Frontiers in Plant Science, 2016",
        link: "https://doi.org/10.3389/fpls.2016.01419",
        description: "Original paper introducing the PlantVillage dataset and CNN baselines that we compare our SNN model against.",
      },
      {
        title: "A real time monitoring system for accurate plant leaves disease detection using deep learning",
        authors: "Kazi Naimur Rahman, Sajal Chandra Banik, Raihan Islam, Arafath Al Fahim",
        venue: "Crop Design, 2025",
        link: "https://doi.org/10.1016/j.cropd.2024.100092",
        description: "This study solves the limits of existing plant disease diagnosis methods by using advanced Convolutional Neural Networks (CNNs) to detect plant illnesses early and accurately. This research makes significant contributions in the following areas.",
      },
    ],
  },
  {
    title: "Datasets",
    icon: Database,
    refs: [
      {
        title: "PlantVillage Dataset",
        authors: "Hughes, D.P. & Salathé, M.",
        venue: "Kaggle / GitHub",
        link: "https://github.com/spMohanty/PlantVillage-Dataset",
        description: "54,306 images of 14 crop species covering 38 disease classes (26 diseases + 12 healthy). Our primary training dataset.",
      },
    ],
  },
  {
    title: "Frameworks & Tools",
    icon: Cpu,
    refs: [
      {
        title: "SpikingJelly",
        authors: "Fang, W. et al.",
        venue: "Open Source SNN Framework",
        link: "https://github.com/fangwei123456/spikingjelly",
        description: "PyTorch-based SNN simulation framework used for building and training our Leaky Integrate-and-Fire network architecture.",
      },
      {
        title: "Cython",
        authors: "Behnel, S. et al.",
        venue: "C-Extensions for Python",
        link: "https://cython.org/",
        description: "Used to compile critical computation loops (spike generation, membrane potential updates) to C for 5-10x performance gains.",
      },
      {
        title: "PyTorch",
        authors: "Paszke, A. et al.",
        venue: "Machine Learning Framework",
        link: "https://pytorch.org/",
        description: "Core deep learning framework for model training, surrogate gradient computation, and tensor operations.",
      },
    ],
  },
  {
    title: "Deployment",
    icon: Code,
    refs: [
      {
        title: "TensorFlow Lite for Edge Deployment",
        authors: "Google",
        venue: "Edge ML Framework",
        link: "https://www.tensorflow.org/lite",
        description: "Used for converting and optimizing models for deployment on Android smartphones and Raspberry Pi devices.",
      },
    ],
  },
];

const References = () => {
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
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Academic Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              References
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Research papers, datasets, frameworks, and tools that power Project ADITI — 
              curated for academic integrity and reproducibility.
            </p>
          </motion.div>
        </section>

        {/* Reference Categories */}
        {referenceCategories.map((category, catIndex) => (
          <section key={category.title} className={`section-padding ${catIndex % 2 === 1 ? "bg-surface-2" : "bg-background"}`}>
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </motion.div>

              <div className="space-y-4 max-w-4xl">
                {category.refs.map((ref, index) => (
                  <motion.div
                    key={ref.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="p-5 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                          {ref.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          <span className="font-medium">{ref.authors}</span> — {ref.venue}
                        </p>
                        <p className="text-sm text-muted-foreground">{ref.description}</p>
                      </div>
                      {ref.link !== "#" && (
                        <a
                          href={ref.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default References;
