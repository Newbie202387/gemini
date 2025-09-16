"use client";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/posts";
import Link from "next/link";
import { use } from "react";

export default function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the entire params Promise first
  const resolvedParams = use(params);
  const postId = parseInt(resolvedParams.id, 10);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return notFound();
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-30 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-cyan-400/50 to-fuchsia-500/50 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-fuchsia-500/50 to-cyan-400/50 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/50 mb-6 flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back to Blog</span>
                </Button>
              </Link>
            </motion.div>

            {/* Hero Image with Overlay */}
            <div className="relative mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 lg:h-96 object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/1200/600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent rounded-xl" />
              <motion.div
                className="absolute bottom-4 left-4 text-white bg-cyan-400/70 px-4 py-2 rounded-full text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {post.category}
              </motion.div>
            </div>

            {/* Article Content */}
            <article className="prose prose-invert max-w-none text-gray-200">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 py-5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div
                className="text-lg leading-relaxed prose prose-invert prose-headings:text-cyan-400 prose-a:text-fuchsia-400 prose-code:text-cyan-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-full border border-fuchsia-500/40 hover:bg-fuchsia-500/30 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                Related Posts
              </h3>
              <ul className="space-y-3">
                {blogPosts
                  .filter(
                    (p) => p.id !== post.id && p.category === post.category
                  )
                  .slice(0, 3)
                  .map((relatedPost) => (
                    <li key={relatedPost.id}>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <motion.div
                          className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
                          whileHover={{ x: 5 }}
                        >
                          {relatedPost.title}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-fuchsia-400 mb-4">
                Share This Post
              </h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-cyan-400 bg-cyan-400/50 border-cyan-400/50 hover:bg-cyan-400/20 hover:text-cyan-300"
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-fuchsia-400 bg-fuchsia-400/50 border-fuchsia-400/50 hover:bg-fuchsia-400/20 hover:text-fuchsia-300"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
