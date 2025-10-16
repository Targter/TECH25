import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import StarfieldBackground from "@/components/ParticleWrapper/ParticleWrapper";
import CartIndicator from "@/components/CartIndicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TECHNICIA'25 | India's Biggest Tech Festival",
  description:
    "Join India's premier tech festival celebrating innovation, creativity, and entrepreneurship with competitions, workshops, and networking opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <head>
          <!-- Google tag (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-935BPG1ZKE"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-935BPG1ZKE');
          </script>
        </head>
        {/* Starfield background - applied globally */}
        <StarfieldBackground
          intensity={0.8}
          rotationSpeed={0.001}
          starCount={2000}
        />

        {/* Main content */}
        <div className="min-h-screen flex flex-col relative">
          <Navbar />
          <CartIndicator />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}