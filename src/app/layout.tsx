import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
import { AppProvider } from "@/context/AppContext";
import { Navigation } from "@/components/Navigation";
import { HeartRain } from "@/components/HeartRain";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

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
  themeColor: "#24153A",
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
        <link rel="icon" href="/assets/logo_pixel.png" />
        <link rel="apple-touch-icon" href="/assets/logo_pixel.png" />
      </head>
      <body className="min-h-full flex flex-col bg-brand-bg antialiased">
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation>
              {children}
            </Navigation>
          </div>
          <HeartRain />
          <ServiceWorkerRegister />
        </AppProvider>
      </body>
    </html>
  );
}
