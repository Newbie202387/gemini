"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Newsletter state
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const services = [
    { name: "Web Development", href: "#services" },
    { name: "Mobile Apps", href: "#services" },
    { name: "E-commerce", href: "#services" },
    { name: "SEO Optimization", href: "#services" },
    { name: "Maintenance", href: "#services" },
    { name: "Consulting", href: "#contact" },
  ];

  const company = [
    { name: "About Us", href: "#about" },
    { name: "Our Process", href: "#process" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Careers", href: "#careers" },
    { name: "Blog", href: "#blog" },
  ];

  const support = [
    { name: "Help Center", href: "#help" },
    { name: "Contact Us", href: "#contact" },
    { name: "System Status", href: "#status" },
    { name: "Documentation", href: "#docs" },
    { name: "API Reference", href: "#api" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "GDPR", href: "#gdpr" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validation
    if (!email.trim()) {
      setErrorMessage("Email is required");
      setSubmitStatus("error");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "footer_newsletter",
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");

        // Track newsletter signup (if analytics is available)
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "newsletter_signup", {
            event_category: "engagement",
            event_label: "footer_newsletter",
          });
        }
      } else {
        throw new Error(data.error || "Failed to subscribe");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom social media icons using SVG
  const FacebookIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );

  const LinkedinIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C8.396 0 7.929.01 7.102.048 6.273.088 5.718.222 5.238.42a5.893 5.893 0 00-2.126 1.384 5.893 5.893 0 00-1.384 2.126C1.53 4.41 1.396 4.961 1.356 5.79.018 6.615.008 7.082.008 12.017c0 4.624.01 5.09.048 5.918.04.83.174 1.381.372 1.861.204.777.478 1.44.923 1.885.444.445 1.107.719 1.884.923.48.198 1.031.332 1.861.372.827.04 1.294.048 5.91.048 4.624 0 5.09-.01 5.91-.048.83-.04 1.38-.174 1.86-.372a5.844 5.844 0 001.885-.923 5.844 5.844 0 00.923-1.885c.198-.48.332-1.031.372-1.861.04-.827.048-1.294.048-5.91 0-4.624-.01-5.09-.048-5.91-.04-.83-.174-1.38-.372-1.86a5.844 5.844 0 00-.923-1.885 5.844 5.844 0 00-1.885-.923c-.48-.198-1.031-.332-1.861-.372C17.107.01 16.64.001 12.017.001zM12.017 2.163c4.624 0 5.027.01 6.807.048.73.04 1.195.166 1.478.276.372.145.64.318.92.598.28.28.453.548.598.92.11.283.236.748.276 1.478.048 1.78.06 2.183.06 6.807 0 4.624-.012 5.027-.06 6.807-.04.73-.166 1.195-.276 1.478-.145.372-.318.64-.598.92-.28.28-.548.453-.92.598-.283.11-.748.236-1.478.276-1.78.048-2.183.06-6.807.06-4.624 0-5.027-.012-6.807-.06-.73-.04-1.195-.166-1.478-.276a2.478 2.478 0 01-.92-.598 2.478 2.478 0 01-.598-.92c-.11-.283-.236-.748-.276-1.478-.048-1.78-.06-2.183-.06-6.807 0-4.624.012-5.027.06-6.807.04-.73.166-1.195.276-1.478.145-.372.318-.64.598-.92.28-.28.548-.453.92-.598.283-.11.748-.236 1.478-.276 1.78-.048 2.183-.06 6.807-.06zM12.017 5.838a6.179 6.179 0 100 12.358 6.179 6.179 0 000-12.358zM12.017 16a4 4 0 110-8 4 4 0 010 8zm6.624-10.845a1.44 1.44 0 10-2.88 0 1.44 1.44 0 002.88 0z" />
    </svg>
  );

  const GithubIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with Web Development Trends
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Get insights, tips, and exclusive offers delivered to your inbox
              monthly.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-purple-700 hover:to-cyan-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center justify-center text-green-400 text-sm mb-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Successfully subscribed! Check your email for confirmation.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center justify-center text-red-400 text-sm mb-2">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errorMessage}
                </div>
              )}

              <p className="text-xs text-gray-500">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="Logo"
                  width={70}
                  height={70}
                  priority
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                  Gemini Pixel Craft
                </span>
                <div className="text-sm text-gray-400 -mt-1">
                  Web Development Excellence
                </div>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 text-lg leading-relaxed max-w-md">
              We create exceptional digital experiences that drive business
              growth. From concept to launch, we&apos;re your trusted
              development partner.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-cyan-400" />
                <a
                  href="mailto:info@geminipixelcraft.com"
                  className="hover:text-white transition-colors"
                >
                  info@geminipixelcraft.com
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3 text-cyan-400" />
                <a
                  href="tel:+17038682950"
                  className="hover:text-white transition-colors"
                >
                  +1 (703) 868-2950
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3 text-cyan-400" />
                <span>Tampa, FL - Worldwide Services</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors group"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors group"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors group"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors group"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors group"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group"
                  >
                    {item.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group"
                  >
                    {item.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Support</h4>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group"
                  >
                    {item.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h5 className="font-semibold mb-3">Business Hours</h5>
              <div className="text-gray-400 text-sm space-y-1">
                <div>Monday - Friday: 9AM - 6PM EST</div>
                <div>Saturday: 10AM - 4PM EST</div>
                <div>Sunday: Emergency support only</div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Legal</h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group"
                  >
                    {item.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="mt-8">
              <h5 className="font-semibold mb-3">Certifications</h5>
              <div className="space-y-2">
                <div className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                  Google Partner
                </div>
                <div className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                  AWS Certified
                </div>
                <div className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                  GDPR Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Gemini Pixel Craft. All rights reserved. Made in
              Tampa, FL.
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                All systems operational
              </span>
              <span>Response time: &lt;2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
