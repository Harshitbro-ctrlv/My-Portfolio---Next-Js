import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/profile";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`
  },
  description: profile.headline,
  keywords: ["Harshit Mishra", "Full Stack Developer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.headline,
    url: absoluteUrl(),
    siteName: `${profile.name} Portfolio`,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: `${profile.name} portfolio preview` }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.headline,
    images: ["/og.svg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night" className="dark">
      <head>
        {/* Blocking script: apply theme before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved ? saved === 'night' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var html = document.documentElement;
                  if (isDark) {
                    html.classList.add('dark');
                    html.setAttribute('data-theme', 'night');
                  } else {
                    html.classList.remove('dark');
                    html.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })()
            `
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans text-base-content antialiased`}>
        {children}
      </body>
    </html>
  );
}
