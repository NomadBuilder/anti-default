import type { Metadata } from "next";
import Script from "next/script";
import {
  Fraunces,
  Atkinson_Hyperlegible,
  IBM_Plex_Mono,
} from "next/font/google";
import { LIVE_APP_URL } from "@/lib/links";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
});

/** Designed for clarity — Braille Institute */
const body = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** Same container as the rest of darkai.ca (Flask templates + ProtectOnt). */
const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-MZ69VXXL";

export const metadata: Metadata = {
  metadataBase: new URL(`${LIVE_APP_URL}/`),
  title: "Un-Default — Catch racist & sexist defaults",
  description:
    "Catch racist, sexist, and ableist defaults in AI-written copy — local rules, plain-language rewrites, no account.",
  openGraph: {
    type: "website",
    siteName: "Un-Default",
    title: "Un-Default — Catch racist & sexist defaults",
    description:
      "Catch racist, sexist, and ableist defaults in AI-written copy — locally, with public rules.",
    url: LIVE_APP_URL,
    images: [
      {
        url: "/og.jpg?v=4",
        width: 2400,
        height: 1260,
        alt: "Un-Default — catch racist, sexist & ableist defaults in AI copy",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Un-Default — Catch racist & sexist defaults",
    description:
      "Catch racist, sexist, and ableist defaults in AI-written copy — locally, with public rules.",
    images: ["/og.jpg?v=4"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
