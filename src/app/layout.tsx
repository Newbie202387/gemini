import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Separate viewport export (required in newer Next.js versions)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00E1FD" },
    { media: "(prefers-color-scheme: dark)", color: "#00E1FD" },
  ],
};

export const metadata: Metadata = {
  title: {
    default:
      "Gemini Pixel Craft | Professional Web Development & Digital Marketing Agency",
    template: "%s | Gemini Pixel Craft",
  },
  description:
    "Expert web development services for modern businesses. We craft stunning, high-performance websites and applications using Next.js, React, and cutting-edge technologies.",
  keywords: [
    "web development",
    "website design",
    "Next.js development",
    "React development",
    "e-commerce development",
    "mobile app development",
    "SEO optimization",
    "web application",
    "custom website",
    "professional web services",
  ],
  authors: [{ name: "Gemini Pixel Craft Team" }],
  creator: "Gemini Pixel Craft",
  publisher: "Gemini Pixel Craft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://geminipixelcraft.com",
    title:
      "Gemini Pixel Craft - Professional Web Development & Digital Marketing Agency",
    description:
      "Expert web development services for modern businesses. We craft stunning, high-performance websites and applications.",
    siteName: "Gemini Pixel Craft",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gemini Pixel Craft - Web Development & Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Gemini Pixel Craft - Professional Web Development & Digital Marketing Agency",
    description:
      "Expert web development services for modern businesses. We craft stunning, high-performance websites and applications.",
    creator: "@geminipixelcraft",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://geminipixelcraft.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gemini Pixel Craft",
              url: "https://geminipixelcraft.com",
              logo: "https://geminipixelcraft.com/logo.png",
              description:
                "Professional Web Development & Digital Marketing Agency for modern businesses",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tampa",
                addressRegion: "FL",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "support@geminipixelcraft.com",
              },
              sameAs: [
                "https://twitter.com/geminipixelcraft",
                "https://linkedin.com/company/geminipixelcraft",
                "https://github.com/geminipixelcraft",
              ],
              service: [
                {
                  "@type": "Service",
                  name: "Web Development",
                  description:
                    "Custom website development using modern technologies",
                },
                {
                  "@type": "Service",
                  name: "Mobile App Development",
                  description: "Native and cross-platform mobile applications",
                },
                {
                  "@type": "Service",
                  name: "E-commerce Solutions",
                  description:
                    "Complete online store development with payment integration",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${orbitron.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />

        {/* Load scripts at the end for better performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData && perfData.loadEventEnd > 0) {
                      const loadTime = perfData.loadEventEnd - perfData.fetchStart;
                      console.log('Page load time:', loadTime, 'ms');
                    }
                  }, 0);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
