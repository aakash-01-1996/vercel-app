import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aakash Ambodkar - Software Engineer",
  description: "Full Stack Developer | AI/ML | System Design. Experienced in building scalable applications and AI/ML solutions.",
  keywords: "software engineer, full stack, AI/ML, system design, React, Node.js",
  authors: [{ name: "Aakash Ambodkar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aakash-portfolio.vercel.app",
    title: "Aakash Ambodkar - Software Engineer",
    description: "Full Stack Developer | AI/ML | System Design",
    siteName: "Aakash Ambodkar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Ambodkar - Software Engineer",
    description: "Full Stack Developer | AI/ML | System Design",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23007BFF' width='100' height='100'/><text x='50' y='65' font-size='70' font-weight='bold' fill='white' text-anchor='middle' font-family='Arial'>A</text></svg>" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aakash Ambodkar",
              url: "https://aakash-portfolio.vercel.app",
              image: "https://aakash-portfolio.vercel.app/avatar.jpg",
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Optum",
              },
              sameAs: [
                "https://linkedin.com/in/aakashambodkar/",
                "https://github.com/aakash-01-1996",
                "https://twitter.com/AakashAmbodkar7",
              ],
              knowsAbout: [
                "Full Stack Development",
                "AI/ML",
                "System Design",
                "React",
                "Node.js",
                "Python",
                "Cloud Computing",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
