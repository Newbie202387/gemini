import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Services from "@/components/layout/Services";
import Portfolio from "@/components/layout/Portfolio";
import Testimonials from "@/components/layout/Testimonials";
import Pricing from "@/components/layout/Pricing";
import Process from "@/components/layout/Process";
import Contact from "@/components/layout/Contact";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/layout/ChatBot";
import CookieConsent from "@/components/layout/CookieConsent";
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        {/* Header with navigation */}
        <Header />

        {/* Main content sections */}
        <Hero />

        {/* Services section */}
        <Services />

        {/* Portfolio showcase */}
        <Portfolio />

        {/* Client testimonials */}
        <Testimonials />

        {/* Our process */}
        <Process />

        {/* Pricing plans */}
        <Pricing />

        {/* Contact form */}
        <Contact />

        {/* Footer */}
        <Footer />

        {/* Floating components */}
        <ChatBot />
        <ScrollToTop />
        <CookieConsent />
      </>
    </Suspense>
  );
}
