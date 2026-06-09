import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Chen | Software Engineer",
  description:
    "Computer Science student at Stony Brook University. Building AI-driven products and full-stack web applications.",
  keywords: [
    "Ryan Chen",
    "Software Engineer",
    "Computer Science",
    "Stony Brook University",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Ryan Chen", url: "https://github.com/ryan-c07" }],
  openGraph: {
    title: "Ryan Chen | Software Engineer",
    description:
      "Computer Science student at Stony Brook University. Building AI-driven products and full-stack web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
