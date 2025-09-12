"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  Globe,
  Download,
  AlertCircle,
  Eye,
  Trash2,
  Edit3,
  ArrowRight,
  Calendar,
  FileText,
  Users,
  Cookie,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GdprCompliance() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const userRights = [
    {
      icon: Eye,
      title: "Right to Access",
      description: "Request to see all personal data we hold about you",
      action: "View my data",
    },
    {
      icon: Edit3,
      title: "Right to Rectification",
      description: "Correct any inaccurate or incomplete information",
      action: "Update my info",
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      description:
        "Request deletion of your personal data ('right to be forgotten')",
      action: "Delete my data",
    },
    {
      icon: Download,
      title: "Data Portability",
      description: "Export your data in a machine-readable format",
      action: "Export data",
    },
    {
      icon: Lock,
      title: "Restrict Processing",
      description: "Limit how we use your personal data",
      action: "Restrict usage",
    },
    {
      icon: AlertCircle,
      title: "Right to Object",
      description: "Object to processing based on legitimate interests",
      action: "Object to processing",
    },
  ];

  const dataTypes = [
    {
      category: "Contact Information",
      items: ["Name", "Email address", "Phone number", "Company name"],
      purpose: "Communication and service delivery",
      retention: "Duration of business relationship + 3 years",
    },
    {
      category: "Technical Data",
      items: [
        "IP address",
        "Browser type",
        "Device information",
        "Usage analytics",
      ],
      purpose: "Website functionality and security",
      retention: "12 months maximum",
    },
    {
      category: "Project Information",
      items: [
        "Project requirements",
        "Design preferences",
        "Budget information",
      ],
      purpose: "Service delivery and project management",
      retention: "Duration of project + 7 years for legal compliance",
    },
    {
      category: "Marketing Data",
      items: ["Newsletter preferences", "Communication history"],
      purpose: "Marketing communications (with consent)",
      retention: "Until consent is withdrawn",
    },
  ];

  const legalBases = [
    {
      basis: "Contract Performance",
      description: "Processing necessary to deliver our services",
      examples: ["Project delivery", "Customer support", "Invoicing"],
    },
    {
      basis: "Legitimate Interest",
      description: "Processing for our legitimate business interests",
      examples: [
        "Website analytics",
        "Fraud prevention",
        "Service improvement",
      ],
    },
    {
      basis: "Consent",
      description: "You have explicitly agreed to processing",
      examples: ["Marketing emails", "Non-essential cookies", "Testimonials"],
    },
    {
      basis: "Legal Obligation",
      description: "Processing required by law",
      examples: ["Tax records", "Financial reporting", "Court orders"],
    },
  ];

  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen py-30 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 p-4 rounded-2xl">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            GDPR Compliance
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is our priority. We&apos;re committed to transparent
            data practices and full compliance with the General Data Protection
            Regulation (GDPR).
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Last updated: December 2024
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Version 2.1
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 rounded-2xl p-8 mb-16 border border-cyan-400/20"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Exercise Your Rights
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Need to access, update, or delete your data? Contact us directly for
            immediate assistance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setShowContactForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Privacy Team
            </Button>
            <Button
              variant="outline"
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Full Policy
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Rights Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700"
            >
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                Your GDPR Rights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {userRights.map((right, index) => (
                  <motion.div
                    key={right.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-700 transition-colors group cursor-pointer"
                    onClick={() =>
                      setActiveSection(
                        activeSection === right.title ? null : right.title
                      )
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                        <right.icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                          {right.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {right.description}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs text-cyan-400 hover:bg-cyan-400/10 p-0 h-auto"
                        >
                          {right.action} <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Data We Collect */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700"
            >
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                Data We Collect
              </h2>
              <div className="space-y-6">
                {dataTypes.map((type, index) => (
                  <motion.div
                    key={type.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-fuchsia-400">
                      {type.category}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-gray-300">
                          Data Points:
                        </h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          {type.items.map((item) => (
                            <li key={item} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-gray-300">
                          Purpose:
                        </h4>
                        <p className="text-sm text-gray-400">{type.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-gray-300">
                          Retention:
                        </h4>
                        <p className="text-sm text-gray-400">
                          {type.retention}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Legal Basis */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700"
            >
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                Legal Basis for Processing
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {legalBases.map((basis, index) => (
                  <motion.div
                    key={basis.basis}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 rounded-xl p-6 border border-fuchsia-400/20"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-fuchsia-400">
                      {basis.basis}
                    </h3>
                    <p className="text-gray-300 mb-4">{basis.description}</p>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-300 text-sm">
                        Examples:
                      </h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {basis.examples.map((example) => (
                          <li key={example} className="flex items-center">
                            <div className="w-1 h-1 bg-fuchsia-400 rounded-full mr-2" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                Privacy Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:privacy@geminipixelcraft.com"
                      className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      privacy@geminipixelcraft.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Data Protection Officer
                    </p>
                    <p className="text-sm text-gray-400">
                      Available Mon-Fri 9AM-6PM EST
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-400">
                      Tampa, FL (US-based company)
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setShowContactForm(true)}
                className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600"
              >
                Submit Privacy Request
              </Button>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                Our Commitment
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Average Response Time
                  </span>
                  <span className="font-bold text-cyan-400">24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Data Breach Record
                  </span>
                  <span className="font-bold text-green-400">0 incidents</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    GDPR Compliant Since
                  </span>
                  <span className="font-bold text-fuchsia-400">May 2018</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Third-party Audits
                  </span>
                  <span className="font-bold text-cyan-400">Annual</span>
                </div>
              </div>
            </motion.div>

            {/* Cookie Notice */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl p-6 border border-orange-400/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Cookie className="h-6 w-6 text-orange-400" />
                <h3 className="text-lg font-bold text-orange-400">
                  Cookie Policy
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                We use essential cookies for functionality and optional cookies
                for analytics. You can manage preferences anytime.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10"
              >
                Manage Cookie Settings
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Footer Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              Questions or Concerns?
            </h3>
            <p className="text-gray-300 mb-6">
              We&apos;re here to help you understand your rights and our data
              practices. Don&apos;t hesitate to reach out with any
              privacy-related questions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Full Privacy Policy
              </Button>
              <Button
                variant="outline"
                className="border-fuchsia-400/50 text-fuchsia-400 hover:bg-fuchsia-400/10"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Data Concern
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
