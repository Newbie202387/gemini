"use client";
import { motion } from "framer-motion";
import { Calendar, User, Clock, Tag, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/posts";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Posts",
    "Web Development",
    "Design",
    "React",
    "E-commerce",
    "SEO",
    "CMS",
    "Mobile",
    "Architecture",
  ];

  const popularTags = [
    "AI",
    "Performance",
    "UI/UX",
    "Next.js",
    "E-commerce",
    "SEO",
    "Headless",
    "PWA",
    "Microservices",
    "React",
  ];

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All Posts" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
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
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Latest Blog Posts
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Insights and updates on web development, design, and technology
            trends
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <motion.input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm transition-all ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white"
                      : "text-fuchsia-500/90 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border-fuchsia-500/50 hover:bg-gray-700/50 hover:border-cyan-400/30 hover:text-cyan-400"
                  }`}
                >
                  {category}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Tags */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-4 text-center">
            Popular Tags
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTags.map((tag, index) => (
              <motion.span
                key={tag}
                className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-sm rounded-full border border-cyan-400/30 cursor-pointer hover:bg-cyan-400/20 transition-colors"
                onClick={() => setSearchQuery(tag)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                viewport={{ once: true }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        {searchQuery && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400">
              Found {filteredPosts.length} article
              {filteredPosts.length !== 1 ? "s" : ""} for &quot;{searchQuery}
              &quot;
            </p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              className="lg:col-span-2 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400/30 transition-colors duration-300 relative h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                <div className="overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                </div>
                <div className="p-6 relative z-10">
                  <div className="flex items-center text-sm text-gray-400 mb-4 space-x-4 flex-wrap gap-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="flex items-center bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full">
                      <Tag className="w-4 h-4 mr-1" />
                      <span>{featuredPost.category}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-cyan-400 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-fuchsia-400/10 text-fuchsia-400 text-sm rounded-full border border-fuchsia-400/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        viewport={{ once: true }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button
                        variant="ghost"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 flex items-center space-x-2 group/btn"
                      >
                        <span>Read More</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Regular Posts */}
          <div className="space-y-8">
            {regularPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400/30 transition-colors duration-300 relative h-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                  <div className="overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-40 object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className="p-4 relative z-10">
                    <div className="flex items-center text-sm text-gray-400 mb-3 space-x-3 flex-wrap gap-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded-full">
                        <Tag className="w-4 h-4 mr-1" />
                        <span>{post.category}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 flex items-center space-x-2 group/btn text-sm"
                        >
                          <span>Read More</span>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {regularPosts.length > 3 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-cyan-400 text-cyan-400 bg-cyan-400/50 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3"
              >
                Load More Articles
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
