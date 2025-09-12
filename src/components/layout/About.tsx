"use client";
import { motion } from "framer-motion";
import { Users, Clock, Code, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const values = [
    {
      icon: Code,
      title: "Technical Excellence",
      description:
        "We use cutting-edge technologies and follow best practices to deliver superior web solutions.",
    },
    {
      icon: Users,
      title: "Client-Centric Approach",
      description:
        "Your success is our priority. We listen, understand, and deliver exactly what you need.",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "We respect deadlines and deliver projects on time without compromising quality.",
    },
    {
      icon: Heart,
      title: "Passion for Design",
      description:
        "We create beautiful, user-friendly interfaces that engage and convert visitors.",
    },
  ];

  const stats = [
    { number: "100+", label: "Projects Completed", color: "text-cyan-400" },
    { number: "50+", label: "Happy Clients", color: "text-fuchsia-400" },
    { number: "5+", label: "Years Experience", color: "text-cyan-400" },
    { number: "24/7", label: "Support Available", color: "text-fuchsia-400" },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Background Elements */}
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
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Gemini Pixel Craft
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We&apos;re a passionate team of web developers and designers
            dedicated to creating exceptional digital experiences that drive
            business growth and exceed expectations.
          </motion.p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 mb-20 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-100">Our Story</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2019, Gemini Pixel Craft started with a simple
                mission: to help businesses establish a powerful online presence
                through innovative web solutions.
              </p>
              <p>
                What began as a small team of passionate developers has grown
                into a trusted partner for businesses of all sizes, from
                startups to established enterprises.
              </p>
              <p>
                We combine technical expertise with creative vision to deliver
                websites and applications that not only look amazing but also
                drive real business results.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold mb-1">{stat.number}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founder Spotlight */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-100">
            Meet Our Founder
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on the left */}
            <motion.div
              className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mx-auto"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/feature-1.jpg" // Replace with your image path
                alt="Robert Davidson - Founder of Gemini Pixel Craft"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Text on the right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h4 className="text-4xl font-semibold text-gray-100 mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                Robert Davidson
              </h4>
              <p className="text-gray-400 leading-relaxed text-lg">
                Robert Davidson founded <strong>Gemini Pixel Craft</strong> to
                bridge creativity and technology in ways that transform
                businesses online. Drawing on years of experience in design and
                development, he leads with innovation, precision, and an
                unwavering commitment to client success.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
