import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const description =
  "Your data driven productivity app, aiming to guide with your progress statistics as you seek to achive consistency in productive work ";

export const metadata: Metadata = {
  title: "pepductivity",
  description: description,
  applicationName: "pepductivity",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "pepductivity",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary",
    // url: 'https://productivity-chi.vercel.app',
    title: "pepductivity",
    description: description,
    images: ["/android-chrome-192x192.png"],
    creator: "@_pepductivity",
  },
  openGraph: {
    type: "website",
    title: "pepductivity",
    description: description,
    siteName: "pepductivity",
    url: "https://productivity-chi.vercel.app",
    images: [
      {
        url: "/apple-touch-icon.png",
      },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#2B5797",
    "msapplication-tap-highlight": "no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#00010C",
};

// export const metadata: Metadata = {
//   title: "Productivity app",
//   description: "get a better understanding of how productive you really are",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} overflow-hidden ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
