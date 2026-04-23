import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import ProductPreview from "./sections/ProductPreview";
import Domain from "./sections/Domain";
import Milestones from "./sections/Milestones";
import Documents from "./sections/Documents";
import Slides from "./sections/Slides";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";  // Import Footer here

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111111]">
      <Navbar />
      <Hero />
      <ProductPreview />
      <Domain />
      <Milestones />
      <Documents />
      <Slides />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}