"use client";
import { motion } from "framer-motion";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HelpCenter() {
  const [activeTab, setActiveTab] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      description: "New to Gemini Pixel Craft? Start here",
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "services",
      title: "Our Services",
      icon: FileText,
      description: "Learn about our web development services",
      color: "from-purple-400 to-fuchsia-400",
    },
    {
      id: "billing",
      title: "Billing & Payments",
      icon: FileText,
      description: "Payment methods and billing questions",
      color: "from-green-400 to-emerald-400",
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: Video,
      description: "Technical issues and troubleshooting",
      color: "from-orange-400 to-red-400",
    },
  ];

  const popularArticles = [
    {
      title: "How to Request a Quote",
      category: "Getting Started",
      readTime: "3 min read",
      url: "#",
    },
    {
      title: "Understanding Our Development Process",
      category: "Services",
      readTime: "5 min read",
      url: "#",
    },
    {
      title: "Payment Methods Accepted",
      category: "Billing",
      readTime: "2 min read",
      url: "#",
    },
    {
      title: "Website Maintenance Packages",
      category: "Technical",
      readTime: "4 min read",
      url: "#",
    },
  ];

  const faqs = {
    "getting-started": [
      {
        question: "How do I get started with your services?",
        answer:
          "Getting started is easy! Simply contact us through our website form, email us at hello@geminipixelcraft.com, or call us directly. We'll schedule a free consultation to discuss your project needs.",
      },
      {
        question: "What information do you need for a project quote?",
        answer:
          "For an accurate quote, we typically need: project goals, target audience, desired features, timeline, and any existing branding materials. The more details you provide, the more accurate our estimate will be.",
      },
      {
        question: "How long does a typical web project take?",
        answer:
          "Project timelines vary based on complexity. Simple websites: 2-4 weeks, E-commerce sites: 4-8 weeks, Custom web applications: 8-16 weeks. We'll provide a detailed timeline during our initial consultation.",
      },
    ],
    services: [
      {
        question: "What web development services do you offer?",
        answer:
          "We offer comprehensive web development services including: custom website development, e-commerce solutions, web applications, mobile-responsive design, SEO optimization, website maintenance, and hosting services.",
      },
      {
        question: "Do you work with existing websites?",
        answer:
          "Yes! We provide website redesigns, functionality upgrades, performance optimization, and ongoing maintenance for existing websites. We can work with most platforms and technologies.",
      },
      {
        question: "What technologies do you use?",
        answer:
          "We work with modern technologies including: React, Next.js, Node.js, TypeScript, Tailwind CSS, WordPress, Shopify, and various databases. We choose the best stack for each project's specific needs.",
      },
    ],
    billing: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept credit cards (Visa, MasterCard, American Express), bank transfers, PayPal, and checks. All payments are secure and we provide detailed invoices for every transaction.",
      },
      {
        question: "What's your payment structure?",
        answer:
          "We typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we can arrange milestone-based payments.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer refunds on a case-by-case basis. If you're not satisfied with our work, we'll do everything we can to make it right. Please review our refund policy for specific details.",
      },
    ],
    technical: [
      {
        question: "What if I need technical support after launch?",
        answer:
          "We offer various support packages: Basic (email support), Pro (priority support), and Enterprise (24/7 support). All clients receive 30 days of free support after project completion.",
      },
      {
        question: "Do you provide website hosting?",
        answer:
          "Yes, we offer reliable hosting solutions with 99.9% uptime, SSL certificates, daily backups, and security monitoring. We can also help migrate your existing site to our servers.",
      },
      {
        question: "How do you handle website security?",
        answer:
          "We implement multiple security layers including: SSL encryption, regular security updates, malware scanning, DDoS protection, and secure coding practices. Security is our top priority.",
      },
    ],
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      responseTime: "Typically replies in 5 minutes",
      action: "Start Chat",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll get back to you",
      responseTime: "Typically replies within 4 hours",
      action: "Send Email",
      color: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly for immediate assistance",
      responseTime: "Available during business hours",
      action: "Call Now",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const filteredFAQs = faqs[activeTab as keyof typeof faqs].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden pt-20">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-xl"></div>
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
            <MessageCircle className="h-12 w-12 text-cyan-400 mr-3" />
            <BookOpen className="h-12 w-12 text-fuchsia-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support
            team
          </p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-lg"
            />
          </motion.div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                  activeTab === category.id
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-gray-700 bg-gray-800 hover:border-cyan-400/50 hover:bg-cyan-400/5"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-100">
            Popular Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400/30 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-sm text-cyan-400 font-medium mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{article.readTime}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">
              {categories.find((cat) => cat.id === activeTab)?.title} FAQs
            </h2>
            <span className="text-gray-400 text-sm">
              {filteredFAQs.length} articles
            </span>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-100 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      activeFAQ === index ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {activeFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                      size="sm"
                    >
                      Read full article
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
            Still Need Help?
          </h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Our support team is here to help you with any questions or issues
            you might have.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-300 mb-4">{method.description}</p>
                <div className="flex items-center justify-center text-sm text-gray-400 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  {method.responseTime}
                </div>
                <Button className={method.color + " w-full"}>
                  {method.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Hours */}
        <motion.div
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Support Hours
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-gray-300">
            <div>
              <div className="font-semibold">Monday - Friday</div>
              <div>9:00 AM - 6:00 PM EST</div>
            </div>
            <div>
              <div className="font-semibold">Saturday</div>
              <div>10:00 AM - 4:00 PM EST</div>
            </div>
            <div>
              <div className="font-semibold">Sunday</div>
              <div>Emergency Support Only</div>
            </div>
            <div>
              <div className="font-semibold">Emergency</div>
              <div>24/7 for Critical Issues</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
