"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

// Extend window type for global analytics objects
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// Types for analytics events
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface ConversionItem {
  item_id: string;
  item_name: string;
  category: string;
  price: number;
}

interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  items?: ConversionItem[];
}

type FacebookEventParams = Record<
  string,
  string | number | string[] | undefined
>;

// Analytics utility class
class AnalyticsManager {
  private isGoogleAnalyticsLoaded = false;
  private isFacebookPixelLoaded = false;

  // Google Analytics methods
  trackPageView(url: string, title: string) {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_title: title,
        page_location: url,
      });
    }
  }

  trackEvent({ action, category, label, value }: AnalyticsEvent) {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value,
      });
    }
  }

  trackConversion({ event_name, currency, value, items }: ConversionEvent) {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event_name, {
        currency: currency || "USD",
        value,
        items,
      });
    }
  }

  // Facebook Pixel methods
  trackFacebookEvent(eventName: string, parameters?: FacebookEventParams) {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventName, parameters);
    }
  }

  trackFacebookCustomEvent(
    eventName: string,
    parameters?: FacebookEventParams
  ) {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", eventName, parameters);
    }
  }

  // Business-specific tracking methods
  trackProjectInquiry(projectType: string, budget: string) {
    this.trackEvent({
      action: "project_inquiry",
      category: "lead_generation",
      label: `${projectType}_${budget}`,
    });

    this.trackFacebookEvent("Lead", {
      content_category: projectType,
      value: this.getBudgetValue(budget),
      currency: "USD",
    });

    this.trackConversion({
      event_name: "generate_lead",
      currency: "USD",
      value: this.getBudgetValue(budget),
      items: [
        {
          item_id: "project_inquiry",
          item_name: projectType,
          category: "web_development",
          price: this.getBudgetValue(budget),
        },
      ],
    });
  }

  trackPricingView(planName: string, price: string) {
    this.trackEvent({
      action: "view_pricing",
      category: "engagement",
      label: planName,
      value: this.getPriceValue(price),
    });

    this.trackFacebookEvent("ViewContent", {
      content_type: "pricing_plan",
      content_ids: [planName.toLowerCase()],
      value: this.getPriceValue(price),
      currency: "USD",
    });
  }

  trackCheckoutInitiated(planName: string, price: string) {
    const value = this.getPriceValue(price);

    this.trackEvent({
      action: "begin_checkout",
      category: "ecommerce",
      label: planName,
      value,
    });

    this.trackFacebookEvent("InitiateCheckout", {
      content_type: "pricing_plan",
      content_ids: [planName.toLowerCase()],
      value,
      currency: "USD",
    });

    this.trackConversion({
      event_name: "begin_checkout",
      currency: "USD",
      value,
      items: [
        {
          item_id: planName.toLowerCase(),
          item_name: planName,
          category: "web_development_service",
          price: value,
        },
      ],
    });
  }

  trackPurchase(planName: string, price: string, transactionId: string) {
    const value = this.getPriceValue(price);

    this.trackEvent({
      action: "purchase",
      category: "ecommerce",
      label: planName,
      value,
    });

    this.trackFacebookEvent("Purchase", {
      content_type: "pricing_plan",
      content_ids: [planName.toLowerCase()],
      value,
      currency: "USD",
    });

    this.trackConversion({
      event_name: "purchase",
      currency: "USD",
      value,
      items: [
        {
          item_id: planName.toLowerCase(),
          item_name: planName,
          category: "web_development_service",
          price: value,
        },
      ],
    });

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "purchase", {
        transaction_id: transactionId,
        value,
        currency: "USD",
        items: [
          {
            item_id: planName.toLowerCase(),
            item_name: planName,
            category: "web_development_service",
            quantity: 1,
            price: value,
          },
        ],
      });
    }
  }

  trackChatInteraction(message: string, isBot: boolean) {
    this.trackEvent({
      action: isBot ? "bot_response" : "user_message",
      category: "chat_engagement",
      label: message.substring(0, 50),
    });

    if (!isBot) {
      this.trackFacebookCustomEvent("ChatEngagement", {
        message_type: "user_inquiry",
      });
    }
  }

  trackScrollDepth(percentage: number) {
    if (percentage >= 25 && percentage % 25 === 0) {
      this.trackEvent({
        action: "scroll",
        category: "engagement",
        label: `${percentage}%`,
        value: percentage,
      });
    }
  }

  trackTimeOnPage(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0 && minutes <= 10) {
      this.trackEvent({
        action: "time_on_page",
        category: "engagement",
        label: `${minutes}_minutes`,
        value: minutes,
      });
    }
  }

  trackVideoPlay(videoTitle: string) {
    this.trackEvent({
      action: "video_play",
      category: "engagement",
      label: videoTitle,
    });

    this.trackFacebookEvent("ViewContent", {
      content_type: "video",
      content_name: videoTitle,
    });
  }

  trackDownload(fileName: string, fileType: string) {
    this.trackEvent({
      action: "file_download",
      category: "engagement",
      label: `${fileName}.${fileType}`,
    });
  }

  trackExternalLinkClick(url: string) {
    this.trackEvent({
      action: "external_link_click",
      category: "navigation",
      label: url,
    });
  }

  private getBudgetValue(budget: string): number {
    const budgetMap: Record<string, number> = {
      "Under $1,000": 500,
      "$1,000 - $2,500": 1750,
      "$2,500 - $5,000": 3750,
      "$5,000 - $10,000": 7500,
      "$10,000+": 15000,
    };
    return budgetMap[budget] ?? 0;
  }

  private getPriceValue(price: string): number {
    return parseInt(price.replace(/[^0-9]/g, "")) || 0;
  }

  trackPerformance() {
    if (typeof window !== "undefined" && "performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType(
            "navigation"
          )[0] as PerformanceNavigationTiming;
          if (perfData) {
            const loadTime = perfData.loadEventEnd - perfData.fetchStart;
            const domContentLoaded =
              perfData.domContentLoadedEventEnd - perfData.fetchStart;

            this.trackEvent({
              action: "page_load_time",
              category: "performance",
              label: "load_complete",
              value: Math.round(loadTime),
            });

            this.trackEvent({
              action: "dom_content_loaded",
              category: "performance",
              label: "dom_ready",
              value: Math.round(domContentLoaded),
            });
          }
        }, 0);
      });
    }
  }

  trackError(error: Error, context: string) {
    this.trackEvent({
      action: "javascript_error",
      category: "error",
      label: `${context}: ${error.message}`,
    });
  }
}

export const analytics = new AnalyticsManager();

// Main Analytics component
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`;
    analytics.trackPageView(url, document.title);
  }, [pathname, searchParams]);

  useEffect(() => {
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        analytics.trackScrollDepth(scrollPercent);
      }
    };

    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(timeOnPage);
    };

    const handleError = (event: ErrorEvent) => {
      analytics.trackError(
        new Error(event.message),
        event.filename || "unknown"
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("error", handleError);

    analytics.trackPerformance();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
          });
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}

export function useAnalytics() {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackProjectInquiry: analytics.trackProjectInquiry.bind(analytics),
    trackPricingView: analytics.trackPricingView.bind(analytics),
    trackCheckoutInitiated: analytics.trackCheckoutInitiated.bind(analytics),
    trackPurchase: analytics.trackPurchase.bind(analytics),
    trackChatInteraction: analytics.trackChatInteraction.bind(analytics),
    trackVideoPlay: analytics.trackVideoPlay.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
    trackExternalLinkClick: analytics.trackExternalLinkClick.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
  };
}
