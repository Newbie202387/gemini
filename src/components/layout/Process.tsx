"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function Process() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [visibleBenefits, setVisibleBenefits] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description:
        "We start by understanding your business goals, target audience, and project requirements through detailed consultation.",
      icon: "🎯",
      deliverables: [
        "Project requirements analysis",
        "Target audience research",
        "Technical specifications",
        "Timeline & milestone planning",
      ],
    },
    {
      number: "02",
      title: "Design & Wireframing",
      description:
        "Our design team creates beautiful, user-centered designs and interactive prototypes for your approval.",
      icon: "🎨",
      deliverables: [
        "User experience (UX) wireframes",
        "Visual design mockups",
        "Interactive prototypes",
        "Design system creation",
      ],
    },
    {
      number: "03",
      title: "Development",
      description:
        "We build your website using cutting-edge technologies, ensuring it's fast, secure, and scalable.",
      icon: "⚡",
      deliverables: [
        "Frontend development",
        "Backend architecture",
        "Database integration",
        "API development",
      ],
    },
    {
      number: "04",
      title: "Testing & Launch",
      description:
        "Rigorous testing across all devices and browsers before launching your site to the world.",
      icon: "🚀",
      deliverables: [
        "Cross-browser testing",
        "Mobile responsiveness",
        "Performance optimization",
        "Security audit",
      ],
    },
    {
      number: "05",
      title: "Support & Growth",
      description:
        "Ongoing maintenance, updates, and optimization to ensure your website continues to perform at its best.",
      icon: "📈",
      deliverables: [
        "Regular maintenance",
        "Performance monitoring",
        "Security updates",
        "Feature enhancements",
      ],
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = stepRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (index !== -1 && !visibleSteps.includes(index)) {
            setVisibleSteps((prev) => [...prev, index]);
          }
        }
      });
    }, observerOptions);

    const benefitObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = benefitRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (index !== -1 && !visibleBenefits.includes(index)) {
            setVisibleBenefits((prev) => [...prev, index]);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) stepObserver.observe(ref);
    });

    benefitRefs.current.forEach((ref) => {
      if (ref) benefitObserver.observe(ref);
    });

    return () => {
      stepObserver.disconnect();
      benefitObserver.disconnect();
    };
  }, [visibleSteps, visibleBenefits]);

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

  return (
    <section id="process" className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <div className="text-center mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Our Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We follow a proven, client-focused process to ensure every project
            is delivered on time, on budget, and exceeds expectations.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className={`flex flex-col lg:flex-row items-start mb-16 last:mb-0 transform transition-all duration-1000 ease-out ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } ${
                visibleSteps.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              {/* Animated Step Number and Icon */}
              <div
                className={`flex-shrink-0 ${
                  index % 2 === 1 ? "lg:ml-12" : "lg:mr-12"
                } mb-6 lg:mb-0 group`}
              >
                <div className="relative transform transition-all duration-700 hover:scale-110">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                    <span className="relative z-10">{step.number}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 text-4xl transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {step.icon}
                  </div>
                  {/* Floating particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-fuchsia-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Animated Content */}
              <div className="flex-grow">
                <div
                  className={`bg-gray-800 rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 ${
                    index % 2 === 1 ? "lg:text-right" : ""
                  }`}
                >
                  <h3 className="text-3xl font-bold mb-4 text-gray-100 transition-colors duration-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-fuchsia-500 hover:bg-clip-text hover:text-transparent">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 transition-all duration-300">
                    {step.description}
                  </p>

                  {/* Animated Deliverables */}
                  <div
                    className={`${
                      index % 2 === 1 ? "lg:flex lg:justify-end" : ""
                    }`}
                  >
                    <div
                      className={`${index % 2 === 1 ? "lg:text-right" : ""}`}
                    >
                      <h4 className="font-semibold text-gray-100 mb-3">
                        Key Deliverables:
                      </h4>
                      <ul
                        className={`space-y-2 ${
                          index % 2 === 1 ? "lg:text-right" : ""
                        }`}
                      >
                        {step.deliverables.map((deliverable, idx) => (
                          <li
                            key={idx}
                            className={`flex items-center text-gray-300 opacity-0 animate-[slideInLeft_0.6s_ease-out_forwards] hover:text-cyan-400 transition-colors duration-300 ${
                              index % 2 === 1
                                ? "lg:justify-end lg:flex-row-reverse"
                                : ""
                            }`}
                          >
                            <CheckCircle
                              className={`h-4 w-4 text-cyan-400 flex-shrink-0 transition-all duration-300 hover:scale-110 ${
                                index % 2 === 1 ? "ml-2" : "mr-2"
                              }`}
                            />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Animated Arrow Connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex items-center mt-8 mb-8 ${
                      index % 2 === 1
                        ? "lg:justify-end lg:flex-row-reverse"
                        : ""
                    }`}
                  >
                    <div className="flex items-center text-cyan-400 animate-pulse">
                      <ArrowRight className="w-6 h-6 transform transition-transform duration-300 hover:translate-x-2" />
                      <div className="ml-4 mr-4 h-px bg-gradient-to-r from-cyan-400/30 to-fuchsia-400/30 w-20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-4 h-full animate-[shimmer_2s_infinite]"></div>
                      </div>
                      <ArrowRight className="w-6 h-6 transform transition-transform duration-300 hover:translate-x-2" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Animated Timeline Overview */}
        <div className="mt-20 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 rounded-2xl p-8 border border-gray-700 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards] hover:border-gray-600 transition-colors duration-500">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-100">
            Typical Project Timeline
          </h3>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center transform transition-all duration-500 hover:scale-105 cursor-pointer group"
              >
                <div className="text-sm font-semibold text-cyan-400 mb-2 group-hover:text-fuchsia-400 transition-colors duration-300">
                  Week {index + 1}-{index + 2}
                </div>
                <div className="text-lg font-medium text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">
                  {step.title.split(" & ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated CTA Section */}
        <div className="text-center mt-20 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
          <div className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl p-8 lg:p-12 text-white max-w-4xl mx-auto relative overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-700">
            {/* Animated Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24 group-hover:scale-110 transition-transform duration-1000"></div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-[float_4s_ease-in-out_infinite]"></div>
              <div className="absolute top-40 right-40 w-3 h-3 bg-white/20 rounded-full animate-[float_3s_ease-in-out_infinite_1s]"></div>
              <div className="absolute bottom-32 left-32 w-2 h-2 bg-white/25 rounded-full animate-[float_5s_ease-in-out_infinite_2s]"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let&apos;s discuss your project and see how we can bring your
                vision to life. Get a free consultation and project estimate
                today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="border-2 border-white bg-fuchsia-400 text-white hover:bg-cyan-400 px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => scrollToSection("contact")}
                >
                  Start Your Project Today
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-cyan-400 px-8 py-4 text-lg font-semibold bg-transparent transform transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("portfolio")}
                >
                  View Our Work
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm opacity-90">
                <div className="flex items-center transform transition-all duration-300 hover:scale-105">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Free Consultation
                </div>
                <div className="flex items-center transform transition-all duration-300 hover:scale-105">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  No Hidden Fees
                </div>
                <div className="flex items-center transform transition-all duration-300 hover:scale-105">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  100% Satisfaction Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Process Benefits */}
        <div className="mt-20 animate-fadeInUp-delay-2000">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Why Our Process Works
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Transparent Communication",
                description:
                  "Regular updates, clear timelines, and open communication throughout the entire process.",
              },
              {
                icon: CheckCircle,
                title: "Quality Assurance",
                description:
                  "Rigorous testing at every stage ensures your project meets the highest standards.",
              },
              {
                icon: CheckCircle,
                title: "Long-term Partnership",
                description:
                  "We don't just build and leave - we're here for ongoing support and growth.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                ref={(el) => {
                  benefitRefs.current[index] = el;
                }}
                className={`text-center p-6 bg-gray-800 rounded-xl border border-gray-700 transform transition-all duration-700 hover:border-cyan-500/50 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group ${
                  visibleBenefits.includes(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">
                  {benefit.title}
                </h4>
                <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
