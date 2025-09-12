interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    featured: boolean;
    tags: string[];
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "The Future of Web Development: Trends to Watch in 2024",
        excerpt:
            "Explore the latest trends shaping web development, from AI integration to advanced performance optimization techniques that are revolutionizing the industry.",
        author: "Taylor Smith",
        date: "December 15, 2024",
        readTime: "5 min read",
        category: "Web Development",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        featured: true,
        tags: ["AI", "Performance", "Trends"],
        content: `
      <h2>Introduction</h2>
      <p>Web development is evolving rapidly, with new technologies and methodologies emerging every year. In 2024, several trends are set to redefine how we build and interact with web applications.</p>
      <h2>AI Integration</h2>
      <p>Artificial intelligence is becoming a cornerstone of modern web development, enabling personalized user experiences and smarter applications...</p>
      <h2>Performance Optimization</h2>
      <p>With users expecting faster load times, techniques like lazy loading, code splitting, and server-side rendering are more critical than ever...</p>
    `,
    },
    {
        id: 2,
        title: "10 Essential UI/UX Design Principles for Modern Websites",
        excerpt:
            "Learn the fundamental design principles that create engaging user experiences and drive conversions while maintaining accessibility and usability.",
        author: "Alex Johnson",
        date: "December 10, 2024",
        readTime: "7 min read",
        category: "Design",
        image:
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
        featured: false,
        tags: ["UI/UX", "Design", "Accessibility"],
        content: `
      <h2>Introduction</h2>
      <p>Great UI/UX design is about creating intuitive and delightful experiences for users. This article covers the top 10 principles every designer should know...</p>
      <h2>Principle 1: User-Centered Design</h2>
      <p>Always prioritize the needs and preferences of your users...</p>
    `,
    },
    {
        id: 3,
        title: "Next.js 15: What's New and Why You Should Upgrade",
        excerpt:
            "Deep dive into the latest Next.js features and improvements that can boost your application performance and developer experience significantly.",
        author: "Sam Wilson",
        date: "December 5, 2024",
        readTime: "6 min read",
        category: "React",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        featured: false,
        tags: ["Next.js", "React", "Performance"],
        content: `
      <h2>Introduction</h2>
      <p>Next.js 15 introduces groundbreaking features that enhance both performance and developer productivity...</p>
      <h2>New Features</h2>
      <p>From improved static generation to enhanced TypeScript support, here’s what’s new...</p>
    `,
    },
    {
        id: 4,
        title: "Building Scalable E-commerce Solutions with Modern Tech",
        excerpt:
            "How we leverage cutting-edge technologies to create e-commerce platforms that grow with your business and handle millions of users seamlessly.",
        author: "Taylor Smith",
        date: "November 28, 2024",
        readTime: "8 min read",
        category: "E-commerce",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        featured: false,
        tags: ["E-commerce", "Scalability", "Tech"],
        content: `
      <h2>Introduction</h2>
      <p>E-commerce platforms need to scale efficiently to handle growth. This article explores modern technologies for building robust solutions...</p>
      <h2>Tech Stack</h2>
      <p>Using Next.js, GraphQL, and microservices for scalability...</p>
    `,
    },
    {
        id: 5,
        title: "SEO Best Practices for Modern Web Applications",
        excerpt:
            "Comprehensive guide to optimizing your website for search engines while maintaining great user experience and technical excellence.",
        author: "Alex Johnson",
        date: "November 20, 2024",
        readTime: "9 min read",
        category: "SEO",
        image:
            "https://images.unsplash.com/photo-1709281847802-9aef10b6d4bf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        featured: false,
        tags: ["SEO", "Optimization", "Marketing"],
        content: `
      <h2>Introduction</h2>
      <p>Search engine optimization is crucial for driving traffic to your website. This guide covers the best practices for modern web applications...</p>
      <h2>Technical SEO</h2>
      <p>Optimizing site speed, structured data, and more...</p>
    `,
    },
    {
        id: 6,
        title: "The Power of Headless CMS in Modern Web Development",
        excerpt:
            "Why headless content management systems are revolutionizing how we build and manage websites with flexibility and scalability.",
        author: "Sam Wilson",
        date: "November 15, 2024",
        readTime: "6 min read",
        category: "CMS",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        featured: false,
        tags: ["CMS", "Headless", "Content"],
        content: `
      <h2>Introduction</h2>
      <p>Headless CMS offers unparalleled flexibility for developers...</p>
      <h2>Benefits</h2>
      <p>Decoupling content from presentation for scalability...</p>
    `,
    },
    {
        id: 7,
        title: "Progressive Web Apps: The Future of Mobile Development",
        excerpt:
            "Discover how PWAs are bridging the gap between web and mobile apps with offline capabilities and native-like experiences.",
        author: "Jordan Lee",
        date: "November 10, 2024",
        readTime: "7 min read",
        category: "Mobile",
        image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        featured: false,
        tags: ["PWA", "Mobile", "Offline"],
        content: `
      <h2>Introduction</h2>
      <p>Progressive Web Apps (PWAs) combine the best of web and mobile...</p>
      <h2>Key Features</h2>
      <p>Offline support, push notifications, and more...</p>
    `,
    },
    {
        id: 8,
        title: "Microservices Architecture: Best Practices and Patterns",
        excerpt:
            "Learn how to design and implement scalable microservices architectures that can handle complex business requirements.",
        author: "Morgan Reed",
        date: "November 5, 2024",
        readTime: "10 min read",
        category: "Architecture",
        image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
        featured: false,
        tags: ["Microservices", "Architecture", "Scalability"],
        content: `
      <h2>Introduction</h2>
      <p>Microservices architecture enables scalable and maintainable systems...</p>
      <h2>Best Practices</h2>
      <p>Service boundaries, communication patterns, and more...</p>
    `,
    },
    {
        id: 9,
        title: "Next.js Performance Optimization: Tips for Faster Websites",
        excerpt:
            "Discover powerful techniques to improve the speed and efficiency of your Next.js applications for better user experiences and SEO rankings.",
        author: "Morgan Reed",
        date: "September 11, 2025",
        readTime: "8 min read",
        category: "Performance",
        image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
        featured: false,
        tags: ["Next.js", "Performance", "Web Development"],
        content: `
    <h2>Introduction</h2>
    <p>Performance is critical in modern web development. Next.js provides powerful tools like image optimization, static generation, and incremental static regeneration to help developers deliver fast, user-friendly websites.</p>

    <h2>Code Splitting and Lazy Loading</h2>
    <p>Leverage dynamic imports in Next.js to load components only when needed. This reduces initial bundle size and improves page load times.</p>

    <h2>Image Optimization</h2>
    <p>Use the <code>next/image</code> component to automatically serve optimized images in modern formats like WebP, ensuring faster loading without sacrificing quality.</p>

    <h2>Static Generation and Caching</h2>
    <p>Where possible, generate pages statically at build time and use Incremental Static Regeneration for content updates. This reduces server load and improves speed.</p>

    <h2>Conclusion</h2>
    <p>By implementing these strategies, you can dramatically enhance your Next.js application's performance, delivering a seamless experience to your users while improving SEO.</p>
  `,
    },

];

export default blogPosts;