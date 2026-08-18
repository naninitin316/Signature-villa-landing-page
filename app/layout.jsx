import Script from "next/script";
import "./globals.css";

// Google Ads (gtag.js) — the account this landing page's campaigns run under.
const GOOGLE_ADS_ID = "AW-18369369185";

const title = "Signature Nature's Edge | Luxury 4BHK Villas in Tukkuguda, Hyderabad";
const description =
  "Signature Nature's Edge by Signature Avenues: HMDA and RERA approved, 121 luxury 4BHK villas across 13.6 acres in Tukkuguda, Hyderabad. Book a private site visit.";
const ogImage = "/assets/natures-edge-official-view-1.jpg";

export const metadata = {
  // TODO: replace with the live domain once it's live, so absolute OG/Twitter image URLs resolve correctly.
  metadataBase: new URL("https://example.com"),
  title,
  description,
  keywords: [
    "Signature Nature's Edge",
    "luxury villas Tukkuguda",
    "4BHK villas Hyderabad",
    "RERA approved villas Hyderabad",
    "HMDA approved villas",
    "Signature Avenues villas",
  ],
  openGraph: {
    title,
    description,
    siteName: "Signature Nature's Edge",
    images: [{ url: ogImage, width: 1920, height: 1080, alt: "Signature Nature's Edge luxury villas" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Warm up the Google endpoints before the tag requests them. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        {children}

        {/* `afterInteractive` is Next's recommended strategy for gtag: the tag
            still fires on every page load, but it loads after the hero paints
            rather than blocking it — which matters on the paid mobile traffic
            this page is built for. */}
        <Script
          id="gtag-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
