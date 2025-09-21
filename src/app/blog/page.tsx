"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Search,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/posts";
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

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
    "Performance",
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

  // Memoized filtered posts for better performance
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
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
  }, [activeCategory, searchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setVisiblePosts(9); // Reset pagination
    },
    []
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setVisiblePosts(9); // Reset pagination
  }, []);

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setVisiblePosts((prev) => prev + 9);
    setIsLoading(false);
  }, []);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  return (
    <>
      <main>
        <section className="pt-20 pb-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden min-h-screen">
          {/* Optimized Background Elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <motion.div
              className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, 30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
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
          </div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Enhanced Hero Section */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h1
                className="text-5xl lg:text-6xl font-extrabold mb-6 py-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Gemini Insights
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Discover cutting-edge trends in tech, design, and development
                from our expert team.
              </motion.p>

              {/* Enhanced Search Bar */}
              <motion.div
                className="max-w-2xl mx-auto relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <motion.input
                  type="text"
                  placeholder="Search articles, topics, or technologies..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-20 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 shadow-xl"
                  whileFocus={{ scale: 1.02 }}
                />
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Enhanced Categories with better spacing */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-center text-lg font-semibold text-gray-300 mb-6">
                Browse by Category
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={
                          activeCategory === category ? "default" : "outline"
                        }
                        onClick={() => handleCategoryChange(category)}
                        className={`text-sm px-6 py-3 rounded-full transition-all font-medium ${
                          activeCategory === category
                            ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg"
                            : "text-gray-300 bg-gray-800/60 border border-gray-600 hover:bg-gray-700/80 hover:text-cyan-400 hover:border-cyan-400/50"
                        }`}
                      >
                        {category}
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Popular Tags Section */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                Popular Tags
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {popularTags.map((tag, index) => (
                  <motion.button
                    key={tag}
                    className="px-4 py-2 bg-cyan-400/10 text-cyan-300 text-sm rounded-full border border-cyan-400/30 cursor-pointer hover:bg-cyan-400/20 hover:scale-110 transition-all duration-200"
                    onClick={() => setSearchQuery(tag)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Results Summary */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {searchQuery && (
                <p className="text-gray-400 mb-2">
                  Found {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? "s" : ""} for &quot;
                  {searchQuery}&quot;
                </p>
              )}
              <p className="text-gray-500 text-sm">
                Showing {Math.min(visiblePosts, filteredPosts.length)} of{" "}
                {filteredPosts.length} articles
              </p>
            </motion.div>

            {/* Enhanced Grid Layout */}
            {displayedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {displayedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 h-full flex flex-col"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-cyan-400/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors leading-tight flex-shrink-0">
                          {post.title}
                        </h3>

                        {/* Excerpt with proper line clamping */}
                        <p className="text-gray-400 mb-4 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-fuchsia-400/10 text-fuchsia-400 text-xs rounded-full border border-fuchsia-400/30"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More Button */}
                        <Link href={`/blog/${post.id}`} className="mt-auto">
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full bg-transparent text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all"
                            >
                              Read Article
                              <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  </motion.article>
                ))}
              </div>
            ) : (
              /* No Results State */
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">
                  No Articles Found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or browse different
                  categories.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All Posts");
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Enhanced Load More Button */}
            {visiblePosts < filteredPosts.length && (
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Articles
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
                <p className="text-gray-500 text-sm mt-3">
                  {filteredPosts.length - visiblePosts} more articles available
                </p>
              </motion.div>
            )}
          </div>
        </section>
        <ScrollToTop />
      </main>
    </>
  );
}
