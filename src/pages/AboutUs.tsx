import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Github, Linkedin, Mail, GraduationCap, Target, Heart } from "lucide-react";
import shubhamImg from "@/assets/shubham1.png";
import indraniImg from "@/assets/indrani.jpeg";

const teamMembers = [
  {
    name: "Shubham Pandey",
    role: "Lead Developer and Researcher",
    description: "ML Engineer in the making | Data Knight.",
    image: shubhamImg,
    github: "https://github.com/ShubhamP1028",
    linkedin: "https://www.linkedin.com/in/shubham1028/",
    email: "mailto:shubham30p@gmail.com",
  },
  {
    name: "Indrani Mandal",
    role: "Developer",
    description: "Developer and Contributor",
    image: indraniImg,
    github: "https://github.com/shivindrani",
    linkedin: "https://linkedin.com/in/indranimandal",
    email: "mailto:indrani.work@gmail.com",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To bridge the gap between cutting-edge neural network research and practical agricultural tools, empowering 120M+ Indian smallholder farmers with accessible, offline-capable disease detection.",
  },
  {
    icon: GraduationCap,
    title: "Academic Goal",
    description: "Publish a research paper on SNN-based agricultural image classification with Cython optimization, and maintain an open-source GitHub repository with 100+ stars.",
  },
  {
    icon: Heart,
    title: "Impact Focus",
    description: "Provide a deployable solution for 1000+ farmers with local language support, offline capability, and instant results — designed for real field conditions, not just lab benchmarks.",
  },
];

const AboutUs = () => {
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
              The Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're B.Tech students building Project
              <span 
                className="text-lg font-bold text-accent" 
                style={{fontFamily: "'Lucida Console', 'Courier New', monospace"}}> A.D.I.T.I. </span> as our capstone project — 
              combining Spiking Neural Networks with practical agricultural deployment to make 
              a real difference for Indian farmers.
            </p>
          </motion.div>
        </section>

        {/* Values */}
        <section className="section-padding bg-surface-2">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border bg-card text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Meet the Team</h2>
              <p className="text-muted-foreground">The people behind Project
                <span 
                className="text-lg font-bold text-accent" 
                style={{fontFamily: "'Lucida Console', 'Courier New', monospace"}}> A.D.I.T.I. </span></p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover mb-5"
                  />

                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-5">{member.description}</p>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Info */}
        <section className="section-padding bg-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-4">B.Tech Capstone Project</h2>
              <p className="text-white/80 mb-6">
                Project<span 
                className="text-lg font-bold text-accent" 
                style={{fontFamily: "'Lucida Console', 'Courier New', monospace"}}> A.D.I.T.I. </span> : Agricultural Disease Inference via Temporal Intelligence,
                is my final year capstone project focused on leveraging third-generation neural 
                networks for practical agricultural impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <div className="font-mono text-2xl font-bold text-white">2026</div>
                  <div className="text-white/70 text-sm">Project Year</div>
                </div>
                <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <div className="font-mono text-2xl font-bold text-white">SNN</div>
                  <div className="text-white/70 text-sm">Core Technology</div>
                </div>
                <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <div className="font-mono text-2xl font-bold text-white">38+</div>
                  <div className="text-white/70 text-sm">Disease Classes</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
