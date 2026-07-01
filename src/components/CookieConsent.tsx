"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

const CONSENT_KEY = "emberloft-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [gaLoaded, setGaLoaded] = useState(false);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  // Track client-side route changes after GA is loaded
  useEffect(() => {
    if (!gaLoaded || !gaId) return;
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("config", gaId, { page_path: pathname });
    }
  }, [pathname, gaLoaded, gaId]);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      // Returning user who already accepted — load GA immediately
      if (gaId) setGaLoaded(true);
    } else if (stored !== "rejected") {
      // First visit — show the banner
      setVisible(true);
    }
  }, [gaId]);

  const choose = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    if (value === "accepted" && gaId) setGaLoaded(true);
  };

  return (
    <>
      {gaLoaded && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
          <div className="max-w-2xl mx-auto bg-[#0A0A0A] rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
            <p className="font-geist text-[#F5F5F5]/70 text-sm leading-relaxed flex-1">
              We use cookies for basic analytics to understand site traffic.
              No data is collected until you accept. Read our{" "}
              <Link href="/privacy" className="text-[#FB4B54] hover:underline">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => choose("rejected")}
                className="font-geist text-sm font-medium text-[#F5F5F5]/60 hover:text-[#F5F5F5] px-4 py-2 transition-colors duration-200"
              >
                Decline
              </button>
              <button
                onClick={() => choose("accepted")}
                className="font-geist text-sm font-semibold bg-[#EEBA0B] text-[#0A0A0A] rounded-full px-5 py-2 hover:bg-[#F2F2F0] transition-colors duration-200"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
