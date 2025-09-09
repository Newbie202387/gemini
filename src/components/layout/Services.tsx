"use client";

import {
  Globe,
  Smartphone,
  ShoppingCart,
  Wrench,
  Search,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description:
        "Custom websites built with modern frameworks like Next.js, React, and Node.js",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "iOS & Android", "App Store Ready"],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description:
        "Complete online store solutions with payment processing and inventory management",
      features: ["Stripe Integration", "Inventory Management", "Analytics"],
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description:
        "Ongoing support and maintenance to keep your website running smoothly",
      features: ["24/7 Monitoring", "Regular Updates", "Bug Fixes"],
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description:
        "Improve your search engine rankings and drive more organic traffic",
      features: ["Keyword Research", "On-page SEO", "Performance Optimization"],
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Protect your website with advanced security measures and SSL certificates",
      features: ["SSL Certificates", "Security Audits", "Malware Protection"],
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (index !== -1 && !visibleCards.includes(index)) {
            // Staggered animation delay
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 150);
          }
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      cardObserver.disconnect();
    };
  }, [visibleCards]);

  return (
    <section id="services" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive web development solutions tailored to your business
            needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`group transform transition-all duration-700 ease-out ${
                visibleCards.includes(index)
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-20 opacity-0 scale-95"
              }`}
            >
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-800/50 hover:shadow-lg transition-all duration-500 hover:border-cyan-400/30 hover:shadow-cyan-500/10 hover:transform hover:scale-[1.02] relative overflow-hidden">
                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-fuchsia-400/40 rounded-full animate-ping"></div>
                </div>

                {/* Enhanced Icon with Animation */}
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-lg flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <service.icon className="h-6 w-6 text-cyan-400 transition-all duration-300 group-hover:scale-110" />
                </div>

                {/* Enhanced Title with Hover Effect */}
                <h3 className="text-xl font-semibold mb-2 text-gray-100 transition-all duration-300 group-hover:text-cyan-400">
                  {service.title}
                </h3>

                {/* Enhanced Description */}
                <p className="text-gray-400 mb-4 transition-all duration-300 group-hover:text-gray-300">
                  {service.description}
                </p>

                {/* Animated Features List */}
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`text-sm text-gray-300 flex items-center transform transition-all duration-500 hover:text-cyan-400 hover:translate-x-2 opacity-0 animate-[slideInLeft_0.6s_ease-out_forwards] group-hover:text-gray-100`}
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 transition-all duration-300 group-hover:scale-125" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
