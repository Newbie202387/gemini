"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Palette,
  Zap,
  Star,
  Play,
  CheckCircle,
  X,
} from "lucide-react";

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const rotatingTexts = [
    "Stunning Websites",
    "Mobile Applications",
    "E-commerce Stores",
    "Web Applications",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const features = [
    {
      icon: Code,
      title: "Modern Development",
      description: "Next.js, React, TypeScript & cutting-edge tech",
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "User-centered design that converts visitors",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance & Core Web Vitals",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gray-900  overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-400/10 to-fuchsia-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-cyan-900/80 backdrop-blur-sm rounded-full text-white text-sm font-medium text-cyan-600 mb-6 shadow-lg">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Trusted by 100+ businesses
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-100">We Create</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-500 bg-clip-text text-transparent min-h-[1.2em] inline-block">
                  {rotatingTexts[currentText]}
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform your business with custom web solutions that drive
                growth, engage users, and deliver exceptional results.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => scrollToSection("contact")}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-cyan-200 text-cyan-400 hover:bg-cyan-500 px-8 py-4 text-lg bg-gray-900/80 backdrop-blur-sm group"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Free Consultation
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  30-Day Guarantee
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  24/7 Support
                </div>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative">
              {/* Main Visual */}
              <div className="relative bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm opacity-75">
                      geminipixelcraft.com
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                    <div className="h-4 bg-white/20 rounded w-2/3"></div>

                    <div className="bg-white/10 rounded-lg p-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 bg-white/10 rounded"></div>
                        <div className="h-16 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-cyan-400 rounded-xl p-3 shadow-lg animate-bounce">
                  <Zap className="w-6 h-6 text-cyan-900" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-fuchsia-400 rounded-xl p-3 shadow-lg animate-pulse">
                  <CheckCircle className="w-6 h-6 text-fuchsia-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-cyan-900/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <Button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Demo video would be embedded here</p>
                <p className="text-sm opacity-75">
                  Replace with actual video URL
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
