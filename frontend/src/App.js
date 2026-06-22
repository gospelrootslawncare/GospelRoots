import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import AreasServed from "@/components/AreasServed";
import MeetTheTeam from "@/components/MeetTheTeam";
import Equipment from "@/components/Equipment";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import GoogleReviews from "@/components/GoogleReviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SeasonalBanner from "@/components/SeasonalBanner";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import useScrollReveal from "@/hooks/useScrollReveal";
import { AuthProvider } from "@/context/AuthContext";
import AdminLogin from "@/pages/AdminLogin";
import AdminQuotes from "@/pages/AdminQuotes";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Plans from "@/pages/Plans";
import Referrals from "@/pages/Referrals";

function HomePage() {
  useScrollReveal();
  return (
    <div data-testid="app-root">
      <SeasonalBanner />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <MeetTheTeam />
        <Equipment />
        <AreasServed />
        <Gallery />
        <Testimonials />
        <GoogleReviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCTA />
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
            <Route path="/plans" element={<Plans />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
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
