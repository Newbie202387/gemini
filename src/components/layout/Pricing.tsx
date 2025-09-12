"use client";
import { useState } from "react";
import { Check, Star, ArrowRight, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans = [
    {
      name: "Starter",
      setupFee: "$999",
      monthlyFee: "$99",
      originalSetupFee: "$1,299",
      description: "Perfect for small businesses and personal websites",
      features: [
        "Responsive Web Design",
        "Up to 5 Pages",
        "Contact Form",
        "SEO Optimization",
        "Mobile Responsive",
        "Social Media Integration",
        "Google Analytics Setup",
      ],
      monthlyServices: [
        "Monthly maintenance & updates",
        "Security monitoring",
        "Performance optimization",
        "Content updates (1 hour/month)",
        "Email support",
        "Monthly reports",
      ],
      popular: false,
      setupPriceId: "price_1S55qiBhJSNlus0RLaLeT16t", // Setup fee price ID
      monthlyPriceId: "price_monthly", // Monthly subscription price ID
      deliveryTime: "7-10 days",
      revisions: "3 rounds",
    },
    {
      name: "Professional",
      setupFee: "$2,499",
      monthlyFee: "$199",
      originalSetupFee: "$3,199",
      description: "Ideal for growing businesses with advanced needs",
      features: [
        "Custom Web Application",
        "Up to 15 Pages",
        "CMS Integration",
        "E-commerce Ready",
        "Advanced SEO",
        "Analytics Setup",
        "Payment Integration",
        "Custom Animations",
        "Database Integration",
        "Admin Dashboard",
        "Email Marketing Setup",
      ],
      monthlyServices: [
        "Priority maintenance & updates",
        "Advanced security monitoring",
        "Performance optimization",
        "Content updates (2 hours/month)",
        "Priority email & phone support",
        "Weekly reports",
        "A/B testing support",
        "Conversion optimization",
      ],
      popular: true,
      setupPriceId: "price_1S55tgBhJSNlus0RGVCa5B4J",
      monthlyPriceId: "price_professional_monthly",
      deliveryTime: "14-21 days",
      revisions: "5 rounds",
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      setupFee: "$4,999",
      monthlyFee: "$399",
      originalSetupFee: "$6,499",
      description: "Complete solution for large businesses",
      features: [
        "Custom Development",
        "Unlimited Pages",
        "Advanced Features",
        "API Integration",
        "Database Design",
        "Performance Optimization",
        "Security Audit",
        "Cloud Deployment",
        "Custom Integrations",
        "Multi-language Support",
        "Advanced Analytics",
        "24/7 Monitoring",
        "Dedicated Account Manager",
      ],
      monthlyServices: [
        "White-glove maintenance",
        "Enterprise security monitoring",
        "Advanced performance optimization",
        "Unlimited content updates",
        "24/7 phone & email support",
        "Daily reports & monitoring",
        "Custom feature development",
        "Dedicated account manager",
        "SLA guarantees",
      ],
      popular: false,
      setupPriceId: "price_1S55vCBhJSNlus0RpA1wpW5t",
      monthlyPriceId: "price_enterprise_monthly",
      deliveryTime: "21-30 days",
      revisions: "Unlimited",
      badge: "Best Value",
    },
  ];

  const handleCheckout = async (plan: any) => {
    setIsLoading(plan.setupPriceId);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          downPaymentPriceId: plan.setupPriceId,
          subscriptionPriceId: plan.monthlyPriceId,
          planName: plan.name,
          billingCycle: "monthly",
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/#pricing`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            One-time setup fee to build your website, then affordable monthly
            maintenance to keep it running perfectly
          </p>

          <div className="bg-gray-800 rounded-lg p-4 max-w-2xl mx-auto border border-gray-700">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Setup fee charged today</span>
              </div>
              <div className="text-gray-500">•</div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-fuchsia-400" />
                <span>Monthly billing starts after launch</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-cyan-400/30 bg-gradient-to-b from-cyan-500/10 to-fuchsia-500/10 shadow-xl"
                  : "border-gray-700 bg-gray-800 hover:border-cyan-400/30 hover:shadow-lg"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  {plan.name}
                </h3>

                {/* Setup Fee */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-1">
                    One-time setup
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                      {plan.setupFee}
                    </span>
                    {plan.originalSetupFee && (
                      <span className="ml-2 text-lg text-gray-400 line-through">
                        {plan.originalSetupFee}
                      </span>
                    )}
                  </div>
                </div>

                {/* Plus Sign */}
                <div className="text-2xl text-gray-500 mb-4">+</div>

                {/* Monthly Fee */}
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-1">Then monthly</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {plan.monthlyFee}
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{plan.description}</p>

                <div className="flex justify-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{plan.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    <span>{plan.revisions}</span>
                  </div>
                </div>
              </div>

              {/* What's Included in Setup */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-3">
                  Initial Development:
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="flex-shrink-0 w-4 h-4 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-2.5 w-2.5 text-cyan-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monthly Services */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-100 mb-3">
                  Monthly Maintenance:
                </h4>
                <ul className="space-y-2">
                  {plan.monthlyServices.map((service, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="flex-shrink-0 w-4 h-4 bg-fuchsia-500/20 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-2.5 w-2.5 text-fuchsia-400" />
                      </div>
                      <span className="text-gray-300">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`w-full h-12 text-base font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
                onClick={() => handleCheckout(plan)}
                disabled={isLoading !== null}
              >
                {isLoading === plan.setupPriceId ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>

              {/* Money-back guarantee */}
              <p className="text-center text-xs text-gray-400 mt-3">
                30-day money-back guarantee • Cancel anytime
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-700">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-100">
            How Our Pricing Works
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-cyan-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-cyan-400 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-100 mb-2">
                Pay Setup Fee
              </h4>
              <p className="text-sm text-gray-400">
                Pay the one-time setup fee to start development of your website
              </p>
            </div>

            <div className="text-center">
              <div className="bg-fuchsia-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-fuchsia-400 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-100 mb-2">
                We Build & Launch
              </h4>
              <p className="text-sm text-gray-400">
                We develop and launch your website within the specified
                timeframe
              </p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-cyan-400 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-100 mb-2">
                Monthly Maintenance
              </h4>
              <p className="text-sm text-gray-400">
                Ongoing monthly billing for maintenance, updates, and support
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
            <p className="text-center text-gray-300 text-sm">
              <strong>No surprises:</strong> Setup fee is charged immediately.
              Monthly billing begins after your website launches. Cancel your
              maintenance subscription anytime with 30 days notice.
            </p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gray-100">
              Need Something Different?
            </h3>
            <p className="text-gray-300 mb-6">
              We offer custom solutions tailored to your specific requirements.
              Get a personalized quote for your unique project.
            </p>

            <Button
              variant="outline"
              className="border-cyan-400 text-cyan-400 bg-cyan-400/50 hover:bg-cyan-400 hover:text-gray-900"
            >
              <a href="#contact" className="flex items-center">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-100">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-2 text-gray-100">
                When does monthly billing start?
              </h4>
              <p className="text-gray-400 text-sm">
                Monthly billing begins after your website is completed and
                launched. You&apos;ll receive an email confirmation when billing
                starts.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-2 text-gray-100">
                What&apos;s included in monthly maintenance?
              </h4>
              <p className="text-gray-400 text-sm">
                Security updates, performance monitoring, content updates, bug
                fixes, and ongoing support based on your plan level.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-2 text-gray-100">
                Can I cancel the monthly subscription?
              </h4>
              <p className="text-gray-400 text-sm">
                Yes! You can cancel anytime with 30 days notice. Your website
                will remain live but won&apos;t receive updates or support.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-2 text-gray-100">
                What happens if I don&apos;t pay the monthly fee?
              </h4>
              <p className="text-gray-400 text-sm">
                Your website stays live, but maintenance, updates, and support
                will be paused until payment is resumed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
