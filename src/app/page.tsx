"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "@/components/layout/Hero";
import Services from "@/components/layout/Services";
import Portfolio from "@/components/layout/Portfolio";
import Testimonials from "@/components/layout/Testimonials";
import Pricing from "@/components/layout/Pricing";
import Process from "@/components/layout/Process";
import Contact from "@/components/layout/Contact";
import ChatBot from "@/components/layout/ChatBot";
import CookieConsent from "@/components/layout/CookieConsent";
import ScrollToTop from "@/components/layout/ScrollToTop";
import AboutUs from "@/components/layout/About";
import Blog from "@/components/layout/Blog";

function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <>
      {/* Main content sections */}
      <Hero />

      {/* About Us section */}
      <AboutUs />

      {/* Services section */}
      <Services />

      {/* Portfolio showcase */}
      <Portfolio />

      {/* Our process */}
      <Process />

      {/* Pricing plans */}
      <Pricing />

      {/* Latest blog posts */}
      <Blog />

      {/* Contact form */}
      <Contact />

      {/* Client testimonials */}
      <Testimonials />

      {/* Footer with navigation and social links */}

      {/* Floating components */}
      <ChatBot />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
