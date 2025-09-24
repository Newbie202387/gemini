"use client";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "definitions", title: "Definitions" },
    { id: "services", title: "Services" },
    { id: "user-obligations", title: "User Obligations" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "payments", title: "Payments" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
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
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden pt-20">
        {/* Simplified Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-cyan-400 mr-3" />
              <FileText className="h-12 w-12 text-fuchsia-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-400 mt-2">
              Please read these terms carefully before using our services
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gray-800 rounded-xl p-6 sticky top-24 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-100 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-cyan-400" />
                  Contents
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                          : "text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Reading time: ~15 minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                {/* Introduction */}
                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-cyan-400" />
                    1. Introduction
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Welcome to Gemini Pixel Craft (&quot;Company&quot;,
                    &quot;we&quot;, &quot;our&quot;, &quot;us&quot;)! These
                    Terms of Service (&quot;Terms&quot;, &quot;Terms of
                    Service&quot;) govern your use of our website located at
                    geminipixelcraft.com (together or individually
                    &quot;Service&quot;) operated by Gemini Pixel Craft.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our Privacy Policy also governs your use of our Service and
                    explains how we collect, safeguard and disclose information
                    that results from your use of our web pages.
                  </p>
                  <p className="text-gray-300">
                    Your agreement with us includes these Terms and our Privacy
                    Policy (&quot;Agreements&quot;). You acknowledge that you
                    have read and understood Agreements, and agree to be bound
                    of them.
                  </p>
                </section>

                {/* Definitions */}
                <section id="definitions" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    2. Definitions
                  </h2>
                  <ul className="text-gray-300 space-y-2">
                    <li>
                      <strong>Service:</strong> Refers to the website and
                      services provided by Gemini Pixel Craft
                    </li>
                    <li>
                      <strong>User:</strong> Refers to any individual or entity
                      using our Service
                    </li>
                    <li>
                      <strong>Content:</strong> Refers to text, images, code,
                      and other materials
                    </li>
                    <li>
                      <strong>Account:</strong> Refers to your personalized
                      access to our Service
                    </li>
                  </ul>
                </section>

                {/* Services */}
                <section id="services" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    3. Services
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Gemini Pixel Craft provides web development, design, and
                    digital services including but not limited to:
                  </p>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li>• Website development and design</li>
                    <li>• E-commerce solutions</li>
                    <li>• Mobile application development</li>
                    <li>• SEO and digital marketing services</li>
                    <li>• Maintenance and support services</li>
                  </ul>
                  <p className="text-gray-300">
                    All services are subject to availability and specific terms
                    outlined in individual service agreements.
                  </p>
                </section>

                {/* User Obligations */}
                <section id="user-obligations" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    4. User Obligations
                  </h2>
                  <p className="text-gray-300 mb-4">
                    By using our Service, you agree to:
                  </p>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li>• Provide accurate and complete information</li>
                    <li>• Maintain the security of your account credentials</li>
                    <li>• Use the Service only for lawful purposes</li>
                    <li>
                      • Not engage in any activity that disrupts or interferes
                      with our Service
                    </li>
                    <li>
                      • Not attempt to reverse engineer or access our systems
                      improperly
                    </li>
                  </ul>
                  <p className="text-gray-300">
                    Violation of these obligations may result in termination of
                    your access to the Service.
                  </p>
                </section>

                {/* Intellectual Property */}
                <section id="intellectual-property" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    5. Intellectual Property
                  </h2>
                  <p className="text-gray-300 mb-4">
                    The Service and its original content (excluding Content
                    provided by users), features and functionality are and will
                    remain the exclusive property of Gemini Pixel Craft and its
                    licensors.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our trademarks and trade dress may not be used in connection
                    with any product or service without the prior written
                    consent of Gemini Pixel Craft.
                  </p>
                  <p className="text-gray-300">
                    Upon full payment, clients receive ownership of the final
                    delivered work product, while Gemini Pixel Craft retains the
                    right to display the work in our portfolio.
                  </p>
                </section>

                {/* Payments */}
                <section id="payments" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    6. Payments
                  </h2>
                  <p className="text-gray-300 mb-4">
                    All services require payment as outlined in individual
                    proposals and contracts. We accept various payment methods
                    including credit cards, bank transfers, and online payment
                    processors.
                  </p>
                  <p className="text-gray-300 mb-4">
                    <strong>Payment Terms:</strong> 50% deposit required to
                    begin work, with remaining balance due upon project
                    completion unless otherwise specified.
                  </p>
                  <p className="text-gray-300">
                    Late payments may be subject to interest charges of 1.5% per
                    month on the outstanding balance.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section id="limitation-liability" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    7. Limitation of Liability
                  </h2>
                  <p className="text-gray-300 mb-4">
                    In no event shall Gemini Pixel Craft, nor its directors,
                    employees, partners, agents, suppliers, or affiliates, be
                    liable for any indirect, incidental, special, consequential
                    or punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses,
                    resulting from:
                  </p>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li>
                      • Your access to or use of or inability to access or use
                      the Service
                    </li>
                    <li>
                      • Any conduct or content of any third party on the Service
                    </li>
                    <li>• Any content obtained from the Service</li>
                    <li>
                      • Unauthorized access, use or alteration of your
                      transmissions or content
                    </li>
                  </ul>
                </section>

                {/* Termination */}
                <section id="termination" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    8. Termination
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We may terminate or suspend your account and bar access to
                    Service immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever and
                    without limitation, including but not limited to a breach of
                    Terms.
                  </p>
                  <p className="text-gray-300">
                    If you wish to terminate your account, you may simply
                    discontinue using Service. All provisions of Terms which by
                    their nature should survive termination shall survive
                    termination, including, without limitation, ownership
                    provisions, warranty disclaimers, indemnity and limitations
                    of liability.
                  </p>
                </section>

                {/* Governing Law */}
                <section id="governing-law" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    9. Governing Law
                  </h2>
                  <p className="text-gray-300 mb-4">
                    These Terms shall be governed and construed in accordance
                    with the laws of Florida, United States, without regard to
                    its conflict of law provisions.
                  </p>
                  <p className="text-gray-300">
                    Our failure to enforce any right or provision of these Terms
                    will not be considered a waiver of those rights. If any
                    provision of these Terms is held to be invalid or
                    unenforceable by a court, the remaining provisions of these
                    Terms will remain in effect.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section id="changes" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    10. Changes to Terms
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material
                    we will provide at least 30 days&quot; notice prior to any
                    new terms taking effect. What constitutes a material change
                    will be determined at our sole discretion.
                  </p>
                  <p className="text-gray-300">
                    By continuing to access or use our Service after any
                    revisions become effective, you agree to be bound by the
                    revised terms. If you do not agree to the new terms, you are
                    no longer authorized to use Service.
                  </p>
                </section>

                {/* Contact Information */}
                <section id="contact">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    11. Contact Information
                  </h2>
                  <p className="text-gray-300 mb-4">
                    If you have any questions about these Terms of Service,
                    please contact us at:
                  </p>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-300">
                      <strong>Email:</strong> legal@geminipixelcraft.com
                    </p>
                    <p className="text-gray-300">
                      <strong>Address:</strong> Tampa, FL, United States
                    </p>
                    <p className="text-gray-300">
                      <strong>Response Time:</strong> Within 48 business hours
                    </p>
                  </div>
                </section>

                {/* Acceptance */}
                <div className="mt-12 p-6 bg-gray-700/30 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold mb-3 text-gray-100">
                    Acceptance of Terms
                  </h3>
                  <p className="text-gray-300 mb-4">
                    By using our services, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms of Service.
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>
                      These terms were last updated on{" "}
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
