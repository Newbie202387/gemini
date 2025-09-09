// app/success/page.tsx
"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Force this page to be dynamic (not prerendered)
export const dynamic = "force-dynamic";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session_id from URL on client side
    const url = new URL(window.location.href);
    const id = url.searchParams.get("session_id");
    setSessionId(id);

    if (id) {
      fetch(`/api/checkout-session?session_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Session data:", data); // Debug log
          setSession(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching session:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Get customer email from different possible sources
  const getCustomerEmail = () => {
    if (!session) return null;

    // Try different ways to get the email
    return (
      session.customer_email ||
      session.customer_details?.email ||
      (session.customer && typeof session.customer === "object"
        ? session.customer.email
        : null)
    );
  };

  const customerEmail = getCustomerEmail();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for choosing Gemini Pixel Craft. We&apos;ve received your
          payment and will contact you within 24 hours to start your project.
        </p>

        {session && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Amount paid:</strong> $
              {(session.amount_total / 100).toFixed(2)}
            </p>
            {customerEmail && (
              <p className="text-sm text-gray-600 mb-2">
                <strong>Email:</strong> {customerEmail}
              </p>
            )}
            {session.metadata?.plan_name && (
              <p className="text-sm text-gray-600">
                <strong>Plan:</strong> {session.metadata.plan_name}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
