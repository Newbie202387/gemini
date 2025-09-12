"use client";
import { motion } from "framer-motion";
import { Cookie, Shield, Settings, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function CookiePolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [cookieConsent, setCookieConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent) {
      setCookieConsent(JSON.parse(savedConsent));
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveCookiePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(cookieConsent));
    setShowBanner(false);

    // Implement actual cookie setting based on preferences
    if (!cookieConsent.analytics) {
      // Disable analytics cookies
    }
    if (!cookieConsent.marketing) {
      // Disable marketing cookies
    }
    if (!cookieConsent.preferences) {
      // Disable preference cookies
    }
  };

  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setCookieConsent(allAccepted);
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "what-are-cookies", title: "What Are Cookies?" },
    { id: "types-of-cookies", title: "Types of Cookies We Use" },
    { id: "cookie-purpose", title: "Purpose of Cookies" },
    { id: "third-party-cookies", title: "Third-Party Cookies" },
    { id: "managing-cookies", title: "Managing Cookies" },
    { id: "your-choices", title: "Your Choices" },
    { id: "updates", title: "Policy Updates" },
    { id: "contact", title: "Contact Us" },
  ];

  const cookieTypes = [
    {
      type: "necessary",
      title: "Necessary Cookies",
      description:
        "Essential for the website to function properly. These cookies cannot be disabled.",
      alwaysActive: true,
      examples: ["Session management", "Security features", "Load balancing"],
    },
    {
      type: "analytics",
      title: "Analytics Cookies",
      description:
        "Help us understand how visitors interact with our website through anonymous data collection.",
      examples: [
        "Google Analytics",
        "Visitor statistics",
        "Performance metrics",
      ],
    },
    {
      type: "preferences",
      title: "Preference Cookies",
      description:
        "Remember your choices and provide enhanced, more personal features.",
      examples: ["Language preferences", "Font size choices", "Custom layouts"],
    },
    {
      type: "marketing",
      title: "Marketing Cookies",
      description:
        "Used to track visitors across websites to display relevant advertisements.",
      examples: ["Facebook Pixel", "Ad targeting", "Conversion tracking"],
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden pt-20">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-xl"></div>
      </div>

      {/* Cookie Consent Banner */}
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 right-4 lg:left-8 lg:right-8 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl z-50"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Cookie className="h-5 w-5 text-cyan-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-100">
                  Cookie Preferences
                </h3>
              </div>
              <p className="text-gray-300 text-sm">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic. By clicking
                &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setShowBanner(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                size="sm"
              >
                Customize
              </Button>
              <Button
                onClick={acceptAllCookies}
                className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white"
                size="sm"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Cookie className="h-12 w-12 text-cyan-400 mr-3" />
            <Shield className="h-12 w-12 text-fuchsia-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-400 mt-2">
            Learn how we use cookies to improve your experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-xl p-6 sticky top-24 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-100 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-cyan-400" />
                Contents
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                        : "text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              {/* Cookie Settings Quick Access */}
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-100 mb-2">
                  Quick Settings
                </h3>
                <Button
                  onClick={() => setShowBanner(true)}
                  variant="outline"
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  size="sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Cookies
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-cyan-400" />
                  1. Introduction
                </h2>
                <p className="text-gray-300 mb-4">
                  This Cookie Policy explains how Gemini Pixel Craft
                  (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses cookies
                  and similar technologies to recognize you when you visit our
                  website at geminipixelcraft.com. It explains what these
                  technologies are and why we use them, as well as your rights
                  to control our use of them.
                </p>
                <p className="text-gray-300">
                  By using our website, you consent to the use of cookies in
                  accordance with this policy. You can manage your cookie
                  preferences at any time using the cookie settings tool.
                </p>
              </section>

              {/* What Are Cookies */}
              <section id="what-are-cookies" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  2. What Are Cookies?
                </h2>
                <p className="text-gray-300 mb-4">
                  Cookies are small text files that are placed on your computer
                  or mobile device when you visit a website. They are widely
                  used to make websites work more efficiently and provide
                  information to the website owners.
                </p>
                <p className="text-gray-300">
                  Cookies may be either &quot;persistent&quot; cookies or
                  &quot;session&quot; cookies. Persistent cookies remain on your
                  device until you delete them or they expire, while session
                  cookies are deleted when you close your browser.
                </p>
              </section>

              {/* Types of Cookies */}
              <section id="types-of-cookies" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  3. Types of Cookies We Use
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {cookieTypes.map((cookieType) => (
                    <div
                      key={cookieType.type}
                      className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-100">
                          {cookieType.title}
                        </h3>
                        {cookieType.alwaysActive ? (
                          <div className="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full">
                            Always active
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <span className="sr-only">
                                {`Enable ${cookieType.title}`}
                              </span>
                              <input
                                type="checkbox"
                                checked={
                                  cookieConsent[
                                    cookieType.type as keyof typeof cookieConsent
                                  ]
                                }
                                onChange={(e) =>
                                  setCookieConsent((prev) => ({
                                    ...prev,
                                    [cookieType.type]: e.target.checked,
                                  }))
                                }
                                className="sr-only peer"
                                disabled={cookieType.alwaysActive}
                                title={`Enable ${cookieType.title}`}
                              />
                              <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-400"></div>
                            </label>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {cookieType.description}
                      </p>
                      <div className="text-xs text-gray-400">
                        <span className="font-medium">Examples:</span>{" "}
                        {cookieType.examples.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={saveCookiePreferences}
                  className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600"
                >
                  Save Cookie Preferences
                </Button>
              </section>

              {/* Purpose of Cookies */}
              <section id="cookie-purpose" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  4. Purpose of Cookies
                </h2>
                <p className="text-gray-300 mb-4">
                  We use cookies for several purposes:
                </p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Essential Operation:</strong> Cookies required for
                      the basic functions of our website
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Performance Analytics:</strong> Understanding how
                      visitors use our website
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Functionality:</strong> Remembering your
                      preferences and settings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong>Marketing:</strong> Delivering relevant
                      advertisements and measuring campaign performance
                    </span>
                  </li>
                </ul>
              </section>

              {/* Third-Party Cookies */}
              <section id="third-party-cookies" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  5. Third-Party Cookies
                </h2>
                <p className="text-gray-300 mb-4">
                  In addition to our own cookies, we may also use various
                  third-party cookies to report usage statistics of the Service,
                  deliver advertisements on and through the Service, and so on.
                </p>
                <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-100 mb-2">
                    Third-Party Services We Use:
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Google Analytics - Website analytics</li>
                    <li>• Google Ads - Advertising platform</li>
                    <li>• Facebook Pixel - Social media advertising</li>
                    <li>• Hotjar - User behavior analytics</li>
                  </ul>
                </div>
                <p className="text-gray-300">
                  These third-party services have their own privacy policies and
                  cookie policies. We recommend reviewing their policies to
                  understand how they use your information.
                </p>
              </section>

              {/* Managing Cookies */}
              <section id="managing-cookies" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  6. Managing Cookies
                </h2>
                <p className="text-gray-300 mb-4">
                  You can control and manage cookies in various ways. Please
                  remember that removing or blocking cookies can negatively
                  impact your user experience and parts of our website may no
                  longer be fully accessible.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-100 mb-2">
                      Browser Controls
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Most browsers allow you to control cookies through their
                      settings preferences. You can usually find these settings
                      in the &quot;Options&quot; or &quot;Preferences&quot; menu
                      of your browser.
                    </p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-100 mb-2">
                      Our Cookie Tool
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Use the cookie settings tool on our website to manage your
                      preferences for analytics, marketing, and functionality
                      cookies.
                    </p>
                  </div>
                </div>
              </section>

              {/* Your Choices */}
              <section id="your-choices" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  7. Your Choices
                </h2>
                <p className="text-gray-300 mb-4">
                  You have the right to decide whether to accept or reject
                  cookies. You can exercise your cookie preferences by:
                </p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li>
                    • Using the cookie consent banner when you first visit our
                    website
                  </li>
                  <li>• Adjusting your browser settings to refuse cookies</li>
                  <li>
                    • Using the cookie settings tool available throughout our
                    website
                  </li>
                  <li>
                    • Opting out of specific third-party cookies through their
                    respective opt-out mechanisms
                  </li>
                </ul>
              </section>

              {/* Policy Updates */}
              <section id="updates" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  8. Policy Updates
                </h2>
                <p className="text-gray-300 mb-4">
                  We may update this Cookie Policy from time to time to reflect
                  changes in technology, legislation, or our operations. When we
                  do, we will revise the &quot;last updated&quot; date at the
                  top of this policy.
                </p>
                <p className="text-gray-300">
                  We encourage you to periodically review this page for the
                  latest information on our cookie practices. Continued use of
                  our website after any changes constitutes your acceptance of
                  the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section id="contact">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  9. Contact Us
                </h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about our use of cookies or this
                  Cookie Policy, please contact us at:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-300">
                    <strong>Email:</strong> privacy@geminipixelcraft.com
                  </p>
                  <p className="text-gray-300">
                    <strong>Address:</strong> Tampa, FL, United States
                  </p>
                  <p className="text-gray-300">
                    <strong>Response Time:</strong> Within 48 business hours
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
