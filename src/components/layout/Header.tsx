"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = [
        "hero",
        "services",
        "portfolio",
        "process",
        "pricing",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Services", href: "services" },
    { name: "Portfolio", href: "portfolio" },
    { name: "Process", href: "process" },
    { name: "Pricing", href: "pricing" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800"
          : "bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/android-chrome-192x192.png"
                alt="Logo"
                width={70}
                height={70}
                priority
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full opacity-20 group-hover:opacity-10 transition-opacity blur"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                Gemini Pixel Craft
              </span>
              <div className="text-xs text-gray-400 -mt-1">Web Development</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-gray-300 hover:text-cyan-400 transition-colors font-medium ${
                  activeSection === link.href ? "text-cyan-400" : ""
                }`}
              >
                {link.name}
                {activeSection === link.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full"></div>
                )}
              </button>
            ))}

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="bg-cyan-400 border-cyan-400 text-white hover:bg-cyan-400 hover:text-gray-900"
                onClick={() => scrollToSection("contact")}
              >
                Get Quote
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection("pricing")}
              >
                Start Project
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 shadow-lg">
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-4 py-3 text-cyan-400 hover:text-fuchsia-400 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-3 border-t border-gray-800 space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900"
                  onClick={() => scrollToSection("contact")}
                >
                  Get Quote
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600"
                  onClick={() => scrollToSection("pricing")}
                >
                  Start Project
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
