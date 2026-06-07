import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navigation } from "@/components/Navigation";
import { HeartRain } from "@/components/HeartRain";

export const metadata: Metadata = {
  title: "80others - Bộ bài kết nối gia đình",
  description: "Trò chơi thẻ bài pixel art kết nối yêu thương gia đình Việt Nam, chia sẻ cảm xúc và vượt qua thử thách mỗi ngày.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "80others",
  },
};

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <head>
        <link rel="icon" href="/assets/logo.jpg" />
        <link rel="apple-touch-icon" href="/assets/logo.jpg" />
      </head>
      <body className="min-h-full flex flex-col bg-brand-bg antialiased">
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation>
              {children}
            </Navigation>
          </div>
          <HeartRain />
        </AppProvider>
      </body>
    </html>
  );
}
