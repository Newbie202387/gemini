"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Phone,
  Globe,
  User,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

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

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "data-collection", title: "Data We Collect" },
    { id: "data-usage", title: "How We Use Data" },
    { id: "data-sharing", title: "Data Sharing" },
    { id: "data-protection", title: "Data Protection" },
    { id: "your-rights", title: "Your Rights" },
    { id: "cookies", title: "Cookies" },
    { id: "third-parties", title: "Third Parties" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "policy-updates", title: "Policy Updates" },
    { id: "contact", title: "Contact Us" },
  ];

  const dataTypes = [
    {
      icon: User,
      title: "Personal Information",
      items: ["Name", "Email address", "Phone number", "Company name"],
    },
    {
      icon: CreditCard,
      title: "Payment Information",
      items: [
        "Billing address",
        "Payment method details",
        "Transaction history",
      ],
    },
    {
      icon: Globe,
      title: "Technical Data",
      items: [
        "IP address",
        "Browser type",
        "Device information",
        "Usage statistics",
      ],
    },
    {
      icon: Database,
      title: "Usage Data",
      items: ["Pages visited", "Time spent", "Click patterns", "Feature usage"],
    },
  ];

  const dataUsage = [
    {
      icon: Shield,
      title: "Service Provision",
      description:
        "To deliver and maintain our services, process payments, and communicate with you",
    },
    {
      icon: Eye,
      title: "Analytics",
      description:
        "To understand how users interact with our website and improve our services",
    },
    {
      icon: Mail,
      title: "Communication",
      description:
        "To send important updates, marketing materials, and respond to inquiries",
    },
    {
      icon: Lock,
      title: "Security",
      description:
        "To protect our services, prevent fraud, and ensure compliance with laws",
    },
  ];

  const userRights = [
    {
      right: "Access",
      description: "Request a copy of your personal data we hold",
    },
    {
      right: "Rectification",
      description: "Correct inaccurate or incomplete personal data",
    },
    {
      right: "Erasure",
      description: "Request deletion of your personal data",
    },
    {
      right: "Restriction",
      description: "Limit how we use your personal data",
    },
    {
      right: "Portability",
      description: "Receive your data in a machine-readable format",
    },
    {
      right: "Objection",
      description: "Object to certain types of processing",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden pt-20">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-xl"></div>
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
            <Lock className="h-12 w-12 text-fuchsia-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 py-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-400 mt-2">
            Your privacy is important to us. Learn how we protect your data.
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
                <Database className="h-5 w-5 mr-2 text-cyan-400" />
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

              {/* Quick Actions */}
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-100 mb-2">
                  Your Privacy
                </h3>
                <p className="text-gray-400 text-xs mb-3">
                  Exercise your privacy rights or contact our Data Protection
                  Officer
                </p>
                <Button
                  variant="outline"
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 mb-2"
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact DPO
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-400/10"
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Data Request
                </Button>
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
                  <Shield className="h-6 w-6 mr-2 text-cyan-400" />
                  1. Introduction
                </h2>
                <p className="text-gray-300 mb-4">
                  Gemini Pixel Craft (&quot;we&quot;, &quot;us&quot;,
                  &quot;our&quot;) is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website
                  geminipixelcraft.com or use our services.
                </p>
                <p className="text-gray-300">
                  We respect your privacy and are committed to protecting
                  personally identifiable information you may provide us through
                  the Website. We have adopted this privacy policy to explain
                  what information may be collected on our Website, how we use
                  this information, and under what circumstances we may disclose
                  the information to third parties.
                </p>
              </section>

              {/* Data Collection */}
              <section id="data-collection" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">
                  2. Information We Collect
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {dataTypes.map((dataType, index) => (
                    <motion.div
                      key={dataType.title}
                      className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-3">
                        <dataType.icon className="h-5 w-5 text-cyan-400 mr-2" />
                        <h3 className="font-semibold text-gray-100">
                          {dataType.title}
                        </h3>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {dataType.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2 flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Automatic Data Collection
                  </h4>
                  <p className="text-gray-300 text-sm">
                    We automatically collect certain information when you visit
                    our website, including your IP address, browser type,
                    operating system, referring URLs, device information, and
                    pages visited. This information helps us understand how
                    visitors use our site and improve their experience.
                  </p>
                </div>
              </section>

              {/* Data Usage */}
              <section id="data-usage" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">
                  3. How We Use Your Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {dataUsage.map((usage, index) => (
                    <motion.div
                      key={usage.title}
                      className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-3">
                        <usage.icon className="h-5 w-5 text-fuchsia-400 mr-2" />
                        <h3 className="font-semibold text-gray-100">
                          {usage.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {usage.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-100 mb-2">
                    Legal Basis for Processing
                  </h4>
                  <p className="text-gray-300 text-sm">
                    We process your personal data based on one or more of the
                    following legal grounds: your consent, performance of a
                    contract, compliance with legal obligations, protection of
                    vital interests, performance of a task carried out in the
                    public interest, and our legitimate interests.
                  </p>
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  4. Data Sharing and Disclosure
                </h2>
                <p className="text-gray-300 mb-4">
                  We may share your information with third parties in the
                  following situations:
                </p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Service Providers:</strong> Third-party vendors
                      who provide services on our behalf (payment processing,
                      analytics, hosting)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Business Transfers:</strong> In connection with a
                      merger, acquisition, or sale of assets
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Legal Requirements:</strong> When required by law,
                      court order, or governmental authority
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Consent:</strong> With your explicit consent for
                      specific purposes
                    </span>
                  </li>
                </ul>
              </section>

              {/* Data Protection */}
              <section id="data-protection" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  5. Data Protection and Security
                </h2>
                <p className="text-gray-300 mb-4">
                  We implement appropriate technical and organizational measures
                  to protect your personal data against unauthorized access,
                  alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>SSL encryption for data transmission</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Regular security assessments and penetration testing
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Access controls and authentication mechanisms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Regular data backups and disaster recovery procedures
                    </span>
                  </li>
                </ul>
                <p className="text-gray-300">
                  While we implement robust security measures, no method of
                  transmission over the Internet or electronic storage is 100%
                  secure. We cannot guarantee absolute security but we strive to
                  use commercially acceptable means to protect your personal
                  data.
                </p>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">
                  6. Your Data Protection Rights
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {userRights.map((right, index) => (
                    <motion.div
                      key={right.right}
                      className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold text-cyan-400 mb-2">
                        {right.right}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {right.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-fuchsia-400/10 border border-fuchsia-400/20 rounded-lg p-4">
                  <h4 className="font-semibold text-fuchsia-400 mb-2">
                    Exercising Your Rights
                  </h4>
                  <p className="text-gray-300 text-sm">
                    To exercise any of these rights, please contact us at
                    privacy@geminipixelcraft.com. We will respond to your
                    request within 30 days and may need to verify your identity
                    before processing your request.
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  7. Cookies
                </h2>
                <p className="text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to enhance
                  your browsing experience, analyze site traffic, and understand
                  where our visitors are coming from. You can choose to disable
                  cookies through your browser settings, but some features of
                  our site may not function properly without them.
                </p>
              </section>

              {/* Third Parties */}
              <section id="third-parties" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  8. Third-Party Services
                </h2>
                <p className="text-gray-300 mb-4">
                  Our website may include links to third-party websites or
                  services that are not operated by Gemini Pixel Craft. We are
                  not responsible for the privacy practices or content of these
                  external sites. We encourage you to review their privacy
                  policies before providing any personal data.
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="children-privacy" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  9. Children&apos;s Privacy
                </h2>
                <p className="text-gray-300 mb-4">
                  Our services are not directed toward children under the age of
                  13. We do not knowingly collect personal information from
                  children. If we become aware that we have inadvertently
                  collected such data, we will take steps to delete it promptly.
                </p>
              </section>

              {/* Policy Updates */}
              <section id="policy-updates" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  10. Policy Updates
                </h2>
                <p className="text-gray-300 mb-4">
                  We may update this Privacy Policy periodically to reflect
                  changes in our practices, technology, legal requirements, or
                  other factors. Any updates will be posted on this page, and
                  the &quot;Last updated&quot; date will be revised. We
                  encourage you to review this policy regularly.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  11. Contact Us
                </h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions or concerns about this Privacy
                  Policy or how we handle your information, please contact us:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>
                    <Mail className="inline h-4 w-4 mr-2 text-cyan-400" />
                    privacy@geminipixelcraft.com
                  </li>
                  <li>
                    <Phone className="inline h-4 w-4 mr-2 text-cyan-400" />
                    +1 (555) 123-4567
                  </li>
                  <li>
                    <Globe className="inline h-4 w-4 mr-2 text-cyan-400" />
                    www.geminipixelcraft.com
                  </li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
