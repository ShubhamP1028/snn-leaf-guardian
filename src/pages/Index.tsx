 import { Header } from "@/components/Header";
 import { HeroSection } from "@/components/HeroSection";
 import { ImageUploader } from "@/components/ImageUploader";
 import { HowItWorks } from "@/components/HowItWorks";
 
 import { ImpactSection } from "@/components/ImpactSection";
 import { Footer } from "@/components/Footer";
 
 const Index = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main>
         <HeroSection />
         <ImageUploader />
         <HowItWorks />
         
         <ImpactSection />
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Index;
