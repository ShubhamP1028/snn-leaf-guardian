import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer id="about" className="section-padding bg-primary border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Project ADITI logo" className="h-10 w-10 rounded-lg object-contain" />
              <span className="text-xl font-bold text-white"
              style={{ fontFamily: "'Lucida Console', 'Courier New', monospace" }}
              >
              <span>A.D.I.T.I.</span>
              </span>
            </Link>
            <p className="text-white/80 max-w-md mb-4">
              Agricultural Disease Inference via Temporal Intelligence
              Web App for Crop Disease Detection using SNN with Cython Optimization.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/ShubhamP1028"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/shubham1028/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:shubham30p@gmail.com"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/#features" className="text-white/70 hover:text-white transition-colors">Scan Plant</Link></li>
              <li><Link to="/workflow" className="text-white/70 hover:text-white transition-colors">Workflow</Link></li>
              <li><Link to="/diseases" className="text-white/70 hover:text-white transition-colors">Disease Library</Link></li>
              <li><Link to="/references" className="text-white/70 hover:text-white transition-colors">References</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Project</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><a href="https://github.com/ShubhamP1028/Project-ADITI" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">GitHub Repo</a></li>
              <li><Link to="/references" className="text-white/70 hover:text-white transition-colors">Research Papers</Link></li>
              {/* <li><a href="mailto:shubham30p@gmail.com" className="text-white/70 hover:text-white transition-colors">Contact</a></li> */}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © 2026 Project <span className="text-lg font-bold text-accent" style={{fontFamily: "'Lucida Console', 'Courier New', monospace"}}> A.D.I.T.I.</span> Built by Shubham.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="https://linkedin.com/in/shubham1028" className="text-white/90 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
