"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-4 md:right-auto md:max-w-md">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4">
        <div className="flex items-start space-x-3">
          <Cookie className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">We use cookies</h4>
            <p className="text-xs text-gray-600 mb-3">
              We use cookies to enhance your browsing experience and analyze
              site traffic. By continuing to use our site, you consent to our
              use of cookies.
            </p>
            <div className="flex space-x-2">
              <Button
                onClick={acceptCookies}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-xs"
              >
                Accept
              </Button>
              <Button
                onClick={declineCookies}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Decline
              </Button>
            </div>
          </div>
          <Button
            onClick={declineCookies}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
