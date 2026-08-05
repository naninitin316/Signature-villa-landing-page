import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
