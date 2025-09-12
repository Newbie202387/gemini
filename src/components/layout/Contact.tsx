"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    projectType: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const projectTypes = [
    "Website Development",
    "E-commerce Store",
    "Mobile Application",
    "Web Application",
    "Website Redesign",
    "SEO Optimization",
    "Other",
  ];

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
  ];

  const timelines = [
    "ASAP (Rush)",
    "2-4 weeks",
    "1-2 months",
    "2-3 months",
    "3+ months",
    "Flexible",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          budget: "",
          projectType: "",
          timeline: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      value: "info@geminipixelcraft.com",
      subtitle: "We'll respond within 24 hours",
      color: "cyan",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (703) 868-2950",
      subtitle: "Mon-Fri 9AM-6PM PST",
      color: "cyan",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Tampa, FL",
      subtitle: "Serving clients worldwide",
      color: "cyan",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      subtitle: "Usually much faster!",
      color: "cyan",
    },
  ];

  const faqItems = [
    {
      question: "How quickly can you start my project?",
      answer:
        "Most projects can begin within 1-2 weeks of contract signing. Rush projects may start sooner with additional fees.",
    },
    {
      question: "Do you work with clients internationally?",
      answer:
        "Yes! We work with clients worldwide. We're experienced with remote collaboration and different time zones.",
    },
    {
      question: "What if I need changes after launch?",
      answer:
        "All our packages include post-launch support. We offer maintenance plans for ongoing updates and improvements.",
    },
    {
      question: "Can you help with hosting and domains?",
      answer:
        "Absolutely! We can handle all technical aspects including hosting setup, domain registration, and SSL certificates.",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 py-5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let&apos;s Build Something Amazing Together
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to transform your business with a custom web solution? Get in
            touch and let&apos;s discuss how we can bring your vision to life.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />

              <motion.h3
                className="text-2xl font-bold mb-6 text-gray-100 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Get In Touch
              </motion.h3>

              <div className="space-y-6 relative z-10">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="bg-cyan-500/20 rounded-lg p-3 mr-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="h-6 w-6 text-cyan-400" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-300">{item.value}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-8 pt-8 border-t border-gray-700 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <motion.div
                      className="text-2xl font-bold text-cyan-400"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      100+
                    </motion.div>
                    <div className="text-sm text-gray-400">Happy Clients</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <motion.div
                      className="text-2xl font-bold text-fuchsia-400"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      24h
                    </motion.div>
                    <div className="text-sm text-gray-400">Response Time</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <motion.div
                  className="grid md:grid-cols-2 gap-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="h-12 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 transition-all duration-300 focus:scale-105"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="h-12 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 transition-all duration-300 focus:scale-105"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="h-12 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 transition-all duration-300 focus:scale-105"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="h-12 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 transition-all duration-300 focus:scale-105"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-3 gap-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    >
                      <option value="">Select type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="budget"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full h-12 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2 text-gray-300"
                  >
                    Project Details *
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your project goals, features needed, design preferences, and any specific requirements..."
                      className="resize-none bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 transition-all duration-300 focus:scale-105"
                    />
                  </motion.div>
                </motion.div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg flex items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    </motion.div>
                    <span className="text-green-300">
                      Message sent successfully! We&apos;ll get back to you
                      within 2 hours.
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                    </motion.div>
                    <span className="text-red-300">
                      Failed to send message. Please try again or email us
                      directly.
                    </span>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <motion.div
                            className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Sending Message...
                        </div>
                      ) : (
                        <motion.div
                          className="flex items-center justify-center"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          Send Message
                          <motion.div
                            whileHover={{ x: 5, rotate: -15 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Send className="ml-2 h-5 w-5" />
                          </motion.div>
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-center text-sm text-gray-400 mt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  By submitting this form, you agree to our privacy policy.
                  We&apos;ll never share your information.
                </motion.p>
              </div>
            </motion.form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            className="text-3xl font-bold text-center mb-12 text-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px -10px rgba(6, 182, 212, 0.3)",
                }}
              >
                <motion.h4
                  className="font-semibold text-lg mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.question}
                </motion.h4>
                <p className="text-gray-300">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
