"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "CEO, TechStart Inc.",
      content:
        "Gemini Pixel Craft transformed our vision into a stunning website that exceeded all expectations. Their attention to detail and technical expertise is unmatched.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      title: "Founder, GrowthLab",
      content:
        "Working with this team was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and it's been driving incredible results.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      title: "Marketing Director, StyleCo",
      content:
        "The mobile app they developed for us has been a game-changer. User engagement is up 300% and our customers love the seamless experience.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "David Kim",
      title: "Owner, LocalBiz",
      content:
        "Professional, responsive, and incredibly talented. They took our small business website from amateur to professional overnight.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it. Here's what our satisfied
            clients have to say about working with us.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group"
            >
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(6, 182, 212, 0.3)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-cyan-400/30 transition-colors duration-300 relative h-full"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                <div className="flex items-center mb-4 relative z-10">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-cyan-400/50"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div>
                    <motion.h4
                      className="font-semibold text-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <motion.p
                      className="text-sm text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {testimonial.title}
                    </motion.p>
                  </div>
                </div>

                <motion.div className="flex mb-3 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    <Quote className="w-8 h-8 text-cyan-400/20 absolute -top-2 -left-1" />
                  </motion.div>
                  <motion.p
                    className="text-gray-300 pl-6 italic"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    "{testimonial.content}"
                  </motion.p>
                </div>

                {/* Floating particles effect */}
                {hoveredIndex === index && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
                        initial={{
                          x: Math.random() * 200,
                          y: Math.random() * 150,
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          y: [null, -80],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          {[
            {
              number: "100+",
              text: "Projects Completed",
              color: "text-cyan-400",
            },
            {
              number: "95%",
              text: "Client Satisfaction",
              color: "text-cyan-400",
            },
            {
              number: "5+",
              text: "Years Experience",
              color: "text-fuchsia-400",
            },
            {
              number: "24/7",
              text: "Support Available",
              color: "text-fuchsia-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className={`text-3xl font-bold mb-2 ${stat.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                {stat.number}
              </motion.div>
              <motion.div
                className="text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                {stat.text}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
