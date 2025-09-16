"use client";
import { motion } from "framer-motion";
import { Calendar, User, Clock, Tag, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
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

  // Memoized filtering for better performance
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

  // Optimized handlers
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleTagClick = useCallback((tag: string) => {
    setSearchQuery(tag);
  }, []);

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section
      id="blog"
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Optimized Background - Single element with reduced complexity */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Improved spacing and responsiveness */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 py-5 lg:mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-6 lg:mb-8 px-4">
            Insights and updates on web development, design, and technology
            trends
          </p>

          {/* Improved Search Bar */}
          <div className="max-w-md mx-auto relative px-4">
            <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
              aria-label="Search blog posts"
            />
          </div>
        </motion.div>

        {/* Simplified Categories - Better mobile layout */}
        <motion.div
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                size="sm"
                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 shadow-lg"
                    : "text-gray-300 bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50 hover:border-cyan-400/30 hover:text-cyan-400"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Simplified Popular Tags */}
        <motion.div
          className="mb-8 lg:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Popular Tags
          </h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 bg-cyan-400/10 text-cyan-300 text-xs sm:text-sm rounded-full border border-cyan-400/20 hover:bg-cyan-400/20 hover:border-cyan-400/40 transition-all duration-200"
                onClick={() => handleTagClick(tag)}
                aria-label={`Filter by ${tag} tag`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search Results Count */}
        {searchQuery && (
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm">
              Found {filteredPosts.length} article
              {filteredPosts.length !== 1 ? "s" : ""} for &quot;{searchQuery}
              &quot;
            </p>
          </div>
        )}

        {/* Improved Grid Layout - Better responsive design */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Featured Post - Better mobile handling */}
            {featuredPost && (
              <motion.article
                className="lg:col-span-8 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 hover:border-cyan-400/30 transition-all duration-300 h-full">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      width={800}
                      height={400}
                      className="w-full h-48 sm:h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-cyan-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <div className="flex items-center bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded-full">
                        <Tag className="w-3 h-3 mr-1" />
                        <span>{featuredPost.category}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">
                      {featuredPost.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-fuchsia-400/10 text-fuchsia-400 text-xs rounded-full border border-fuchsia-400/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button
                        variant="outline"
                        className="bg-transparent text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all"
                      >
                        Read Article
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Regular Posts - Improved sidebar layout */}
            <div className="lg:col-span-4 space-y-6">
              {regularPosts.slice(0, 3).map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 hover:border-cyan-400/30 transition-all duration-300 h-full">
                    <div className="flex sm:flex-col">
                      {/* Image */}
                      <div className="w-24 h-24 sm:w-full sm:h-32 flex-shrink-0 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 96px, (max-width: 1200px) 100vw, 400px"
                        />
                      </div>

                      <div className="flex-1 p-4">
                        {/* Meta */}
                        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-2">
                          <span className="bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold mb-2 text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-0 h-auto font-normal"
                          >
                            Read More
                            <ChevronRight className="ml-1 w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ) : (
          /* No Results State */
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">
              No Articles Found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or browse different categories.
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
          </div>
        )}

        {/* View All Button - For landing page */}
        {filteredPosts.length > 4 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 hover:border-cyan-400 px-8 py-3 rounded-full transition-all duration-300"
              >
                View All Articles
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
