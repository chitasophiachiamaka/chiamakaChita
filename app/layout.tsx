import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Chiamaka Sophia Chita | Developer & Educator", template: "%s | Chiamaka Chita" },
  description: "The portfolio of Chiamaka Sophia Chita: full-stack development, computer science education, and data-driven projects.",
  openGraph: { title: "Chiamaka Sophia Chita | Developer & Educator", description: "Building clear, useful digital experiences at the intersection of technology and education.", type: "website", images: ["/images/chiamaka-portrait.jpg"] },
  twitter: { card: "summary_large_image", title: "Chiamaka Sophia Chita", description: "Full-stack developer, computer science educator, and data science enthusiast." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
