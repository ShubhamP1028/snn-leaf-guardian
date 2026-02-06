import { Leaf, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="section-padding bg-primary border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-white">
                Plant<span className="text-accent">Doc</span>
              </span>
            </a>
            <p className="text-white/80 max-w-md mb-4">
              Plant Disease Detection using Spiking Neural Networks with Cython Optimization.
              A B.Tech Capstone Project focused on empowering Indian smallholder farmers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@plantdoc.ai"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#diseases" className="text-white/70 hover:text-white transition-colors">Disease Library</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">API Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Research</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Technical Paper</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">GitHub Repo</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">PlantVillage Dataset</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">SNN Resources</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © 2026 PlantDoc. Built by Shubham Pandey. B.Tech Capstone Project.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
