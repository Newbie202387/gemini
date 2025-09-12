"use client";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Coffee,
  Laptop,
  Heart,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Careers() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const jobOpenings = [
    {
      title: "Senior Full Stack Developer",
      department: "Development",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      description:
        "We're looking for an experienced full stack developer to join our growing team and help build amazing web applications.",
      requirements: [
        "5+ years of experience with React/Next.js",
        "Strong backend skills (Node.js, PostgreSQL)",
        "Experience with modern deployment practices",
        "Excellent communication skills",
      ],
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Tampa, FL / Remote",
      type: "Full-time",
      salary: "$60,000 - $90,000",
      description:
        "Join our design team to create beautiful, user-centered interfaces that delight our clients and their customers.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio demonstrating modern design",
        "Understanding of web development principles",
      ],
    },
    {
      title: "Project Manager",
      department: "Operations",
      location: "Tampa, FL",
      type: "Full-time",
      salary: "$55,000 - $75,000",
      description:
        "Help coordinate our client projects and ensure smooth delivery from conception to launch.",
      requirements: [
        "2+ years of project management experience",
        "Experience with web development projects",
        "Strong organizational and communication skills",
        "PMP certification preferred",
      ],
    },
  ];

  const benefits = [
    {
      icon: Laptop,
      title: "Remote-First Culture",
      description:
        "Work from anywhere with flexible hours and modern equipment provided.",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance and wellness programs for you and your family.",
    },
    {
      icon: Coffee,
      title: "Professional Growth",
      description:
        "Learning budget, conference attendance, and mentorship opportunities.",
    },
    {
      icon: Users,
      title: "Collaborative Team",
      description:
        "Work with passionate professionals in a supportive, inclusive environment.",
    },
  ];

  const values = [
    {
      title: "Innovation First",
      description:
        "We embrace new technologies and creative solutions to solve complex problems.",
    },
    {
      title: "Work-Life Balance",
      description:
        "We believe great work happens when people have time to recharge and pursue their passions.",
    },
    {
      title: "Continuous Learning",
      description:
        "We invest in our team's growth through training, conferences, and skill development.",
    },
    {
      title: "Client Success",
      description:
        "Every team member contributes to delivering exceptional results for our clients.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 py-5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join Our Amazing Team
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Help us create exceptional digital experiences while growing your
            career in a supportive, innovative environment.
          </motion.p>
        </motion.div>

        {/* Why Join Us */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Why Choose Gemini Pixel Craft?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 text-center group border border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Our Values
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Openings */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Current Openings
          </h3>
          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 10px 30px -10px rgba(6, 182, 212, 0.3)",
                }}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="h-6 w-6 text-cyan-400" />
                      <h4 className="text-2xl font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
                        {job.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{job.description}</p>

                    <div>
                      <h5 className="font-semibold text-gray-100 mb-2">
                        Requirements:
                      </h5>
                      <ul className="text-gray-400 space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white px-6 py-3 whitespace-nowrap group">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Current Openings? */}
        <motion.div
          className="text-center bg-gray-800 rounded-xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-100">
            Don&apos;t See a Perfect Fit?
          </h3>
          <p className="text-gray-300 mb-6">
            We&apos;re always interested in connecting with talented
            individuals. Send us your resume and let us know how you&apos;d like
            to contribute to our team.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white px-8 py-3">
              Send General Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
