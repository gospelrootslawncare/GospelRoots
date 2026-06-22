import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import useScrollReveal from "@/hooks/useScrollReveal";
import { AuthProvider } from "@/context/AuthContext";
import AdminLogin from "@/pages/AdminLogin";
import AdminQuotes from "@/pages/AdminQuotes";

function HomePage() {
  useScrollReveal();
  return (
    <div data-testid="app-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminQuotes />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{ style: { fontFamily: "Manrope, sans-serif" } }}
      />
    </div>
  );
}

export default App;
