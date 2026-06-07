"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg flex items-center justify-center font-pixel text-brand-text">Đang tải...</div>}>
      <NavigationContent>{children}</NavigationContent>
    </Suspense>
  );
};

const NavigationContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const { points, streak, completedCount, theme, toggleTheme } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFundraisingModalOpen, setIsFundraisingModalOpen] = useState(false);

  // PWA install prompt
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // Detect platform for install instructions
  const getInstallPlatform = () => {
    if (typeof navigator === "undefined") return "desktop";
    const ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua)) return "ios";
    if (/android/i.test(ua)) return "android";
    return "desktop";
  };

  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      try {
        // Native install (Chrome/Edge)
        await installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === "accepted") {
          setInstallPrompt(null);
          setIsInstalled(true);
        } else {
          // If user dismissed the prompt, show guide as fallback
          setShowInstallGuide(true);
        }
      } catch (error) {
        // If native prompt fails
        setShowInstallGuide(true);
      }
    } else {
      // No native prompt — show manual instructions
      setShowInstallGuide(true);
    }
  };

  const navItems = [
    { name: "Trang chủ", href: "/", icon: "hn-home-solid" },
    { name: "Thẻ", href: "/cards?tab=today", icon: "hn-grid-solid" },
    { name: "Thử thách", href: "/challenges", icon: "hn-trophy-solid" },
    { name: "Cộng đồng", href: "/community", icon: "hn-users-solid" },
    { name: "Hồ sơ", href: "/profile", icon: "hn-user-solid" },
  ];

  const sidebarItems = [
    { name: "Trang chủ", href: "/", icon: "hn-home-solid" },
    { name: "Thẻ hôm nay", href: "/cards?tab=today", icon: "hn-grid-solid" },
    { name: "Thử thách", href: "/challenges", icon: "hn-trophy-solid" },
    { name: "Huy hiệu", href: "/badges", icon: "hn-crown-solid" },
    { name: "Cộng đồng", href: "/community", icon: "hn-users-solid" },
    { name: "Hồ sơ", href: "/profile", icon: "hn-user-solid" },
    { name: "Gây quỹ cho nhóm", href: "#", icon: "hn-heart-solid" },
  ];

  const getIsActive = (href: string, name: string) => {
    const basePath = href.split("?")[0];
    const normPathname = pathname.replace(/\/$/, "");
    const normBasePath = basePath.replace(/\/$/, "");

    if (normPathname !== normBasePath) return false;

    if (normBasePath === "/cards") {
      const isTodayTab = tab === "today";
      if (name === "Thẻ hôm nay" || name === "Thẻ") {
        return isTodayTab;
      }
    }

    return true;
  };

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-brand-card border-b-3 border-brand-outline sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 border-2 border-brand-outline rounded-lg overflow-hidden bg-[#1A102B] flex items-center justify-center shadow-pixel-sm">
            <Image
              src="/assets/logo_pixel.png"
              alt="80others logo"
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <span className="font-pixel text-2xl font-bold tracking-tight text-brand-text flex items-center gap-1">
            80others<i className="hn hn-sparkles-solid text-brand-pink text-xs animate-bounce" />
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Streak 🔥 */}
          <div className="stat-card-streak flex items-center gap-2 border-2 border-brand-outline px-3 py-1.5 rounded-lg shadow-pixel-sm">
            <i className="hn hn-fire-solid text-[20px] text-orange-500 animate-pulse" />
            <div className="text-left leading-none">
              <span className="font-pixel text-sm font-bold block text-brand-text">{streak}</span>
              <span className="text-[10px] text-brand-text/75 font-semibold font-pixel">Chuỗi gia đình</span>
            </div>
          </div>

          {/* Connection Points ❤️ */}
          <div className="stat-card-points flex items-center gap-2 border-2 border-brand-outline px-3 py-1.5 rounded-lg shadow-pixel-sm">
            <i className="hn hn-heart-solid text-[20px] text-brand-pink animate-pulse" />
            <div className="text-left leading-none">
              <span className="font-pixel text-sm font-bold block text-brand-text">{points.toLocaleString("vi-VN")}</span>
              <span className="text-[10px] text-brand-text/75 font-semibold font-pixel">Điểm kết nối</span>
            </div>
          </div>

          {/* Notifications Bell */}
          <button className="relative p-2 border-2 border-brand-outline rounded-lg bg-brand-bg hover:bg-brand-border transition-colors shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5">
            <i className="hn hn-bell-solid text-[20px] text-brand-text" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-pink rounded-full border border-brand-outline" />
          </button>

          {/* PWA Install Button - Desktop */}
          {!isInstalled && (
            <button
              onClick={handleInstall}
              id="pwa-install-btn-desktop"
              className="flex items-center gap-1.5 px-3 py-2 border-2 border-brand-purple rounded-lg bg-brand-purple/10 hover:bg-brand-purple/20 text-brand-purple font-pixel font-bold text-xs shadow-pixel-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Cài đặt ứng dụng"
            >
              <i className="hn hn-download-alt-solid text-[16px]" />
              <span className="hidden lg:inline">Cài đặt</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-brand-outline rounded-lg bg-brand-bg hover:bg-brand-border transition-colors shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5 cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <i className="hn hn-sun-solid text-[20px] text-brand-yellow" />
            ) : (
              <i className="hn hn-moon-solid text-[20px] text-brand-purple" />
            )}
          </button>

          {/* User Widget header */}
          <Link
            href="/profile"
            className="flex items-center gap-2.5 pl-4 border-l-2 border-brand-border hover:opacity-80 transition-opacity"
          >
            <div className="relative w-9 h-9 rounded-full border-2 border-brand-outline overflow-hidden bg-brand-purple-light shadow-pixel-sm">
              <Image
                src="/assets/avatars/avatar.png"
                alt="Charlie Puth avatar"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="text-left leading-tight hidden lg:block">
              <p className="font-pixel font-bold text-sm text-brand-text">Charlie Puth</p>
              <span className="text-[11px] font-pixel text-brand-purple-light font-bold bg-brand-outline px-1.5 py-0.2 rounded">Lv.5</span>
            </div>
          </Link>
        </div>
      </header>

      {/* ================= MOBILE HEADER ================= */}
      <header className="flex md:hidden items-center justify-between px-4 py-3.5 bg-brand-card border-b-3 border-brand-outline sticky top-0 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 border-2 border-brand-outline rounded-lg bg-brand-bg shadow-pixel-sm active:translate-y-0.5 flex items-center justify-center"
        >
          <i className="hn hn-bars-solid text-[20px] text-brand-text" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 border border-brand-outline rounded-md overflow-hidden bg-[#1A102B]">
            <Image
              src="/assets/logo_pixel.png"
              alt="80others logo"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="font-pixel text-lg font-bold tracking-tight text-brand-text">80others</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* PWA Install Button - Mobile */}
          {!isInstalled && (
            <button
              onClick={handleInstall}
              id="pwa-install-btn-mobile"
              className="p-2 border-2 border-brand-purple rounded-lg bg-brand-purple/10 hover:bg-brand-purple/20 shadow-pixel-sm active:translate-y-0.5 cursor-pointer flex items-center justify-center"
              title="Cài đặt ứng dụng"
            >
              <i className="hn hn-download-alt-solid text-[18px] text-brand-purple" />
            </button>
          )}

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-brand-outline rounded-lg bg-brand-bg shadow-pixel-sm active:translate-y-0.5 cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <i className="hn hn-sun-solid text-[18px] text-brand-yellow" />
            ) : (
              <i className="hn hn-moon-solid text-[18px] text-brand-purple" />
            )}
          </button>

          <button className="p-2 border-2 border-brand-outline rounded-lg bg-brand-bg shadow-pixel-sm active:translate-y-0.5 flex items-center justify-center">
            <i className="hn hn-bell-solid text-[20px] text-brand-text" />
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden md:flex flex-col w-64 bg-brand-bg border-r-3 border-brand-outline p-4 justify-between h-[calc(100vh-77px)] sticky top-[77px] z-30 shrink-0">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = getIsActive(item.href, item.name);
              if (item.name === "Gây quỹ cho nhóm") {
                return (
                  <button
                    key={item.name}
                    onClick={() => setIsFundraisingModalOpen(true)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-semibold bg-transparent text-brand-text border-transparent hover:bg-brand-border/40 hover:border-brand-border w-full text-left cursor-pointer"
                  >
                    <i className={`hn ${item.icon} text-brand-text text-[18px]`} />
                    <span className="font-pixel text-[13px] tracking-wide font-medium">{item.name}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-semibold ${isActive
                    ? "bg-brand-purple text-white border-brand-outline shadow-pixel-sm translate-x-1"
                    : "bg-transparent text-brand-text border-transparent hover:bg-brand-border/40 hover:border-brand-border"
                    }`}
                >
                  <i className={`hn ${item.icon} ${isActive ? "text-white" : "text-brand-text"} text-[18px]`} />
                  <span className="font-pixel text-[13px] tracking-wide font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Sidebar Profile Info Card Widget */}
          <div className="bg-brand-card border-3 border-brand-outline p-4 rounded-2xl shadow-pixel relative overflow-hidden mt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-full border-2 border-brand-outline overflow-hidden bg-brand-purple-light shadow-pixel-sm shrink-0">
                <Image
                  src="/assets/avatars/avatar.png"
                  alt="Charlie Puth avatar"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <h4 className="font-pixel font-bold text-sm text-brand-text">Charlie Puth</h4>
                <span className="text-[10px] font-pixel text-brand-purple-light font-bold bg-brand-outline px-1.5 py-0.2 rounded">Lv.5</span>
              </div>
            </div>

            {/* XP progress */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] font-bold mb-1 font-pixel">
                <span>XP</span>
                <span>620 / 900 XP</span>
              </div>
              <div className="h-3.5 bg-brand-bg border-2 border-brand-outline rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-brand-purple-light rounded-full border border-brand-outline"
                  style={{ width: "68.8%" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1 border-t-2 border-brand-border pt-3 text-center text-xs">
              <div>
                <span className="block font-pixel font-bold text-brand-purple-light text-base">{points}</span>
                <span className="text-[10px] text-brand-text/70 uppercase font-bold font-pixel">Điểm</span>
              </div>
              <div>
                <span className="block font-pixel font-bold text-orange-500 text-base">{streak}</span>
                <span className="text-[10px] text-brand-text/70 uppercase font-bold font-pixel">Chuỗi</span>
              </div>
              <div>
                <span className="block font-pixel font-bold text-brand-pink text-base">{completedCount}</span>
                <span className="text-[10px] text-brand-text/70 uppercase font-bold font-pixel">Thẻ</span>
              </div>
            </div>

            <Link
              href="/profile"
              className="mt-3.5 flex items-center justify-center w-full py-1.5 border-2 border-brand-outline rounded-xl bg-brand-purple-light/20 text-brand-text font-pixel font-bold text-xs hover:bg-brand-purple-light/40 transition-colors active:translate-y-0.5"
            >
              Xem chi tiết hồ sơ →
            </Link>
          </div>
        </aside>

        {/* ================= MOBILE NAV DRAWER (SIDEBAR HAMBURGER MENU) ================= */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-brand-text/60 backdrop-blur-sm z-50 md:hidden flex">
            <div className="w-64 bg-brand-bg border-r-3 border-brand-outline p-5 flex flex-col justify-between h-full animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 border border-brand-outline rounded-md overflow-hidden bg-[#1A102B]">
                      <Image
                        src="/assets/logo_pixel.png"
                        alt="80others logo"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-pixel text-xl font-bold tracking-tight text-brand-text">80others</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 border border-brand-outline rounded bg-brand-bg flex items-center justify-center"
                  >
                    <i className="hn hn-times-solid text-[18px] text-brand-text" />
                  </button>
                </div>

                <div className="space-y-1">
                  {sidebarItems.map((item) => {
                    const isActive = getIsActive(item.href, item.name);
                    if (item.name === "Gây quỹ cho nhóm") {
                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsFundraisingModalOpen(true);
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all font-semibold bg-transparent text-brand-text border-transparent hover:bg-brand-border/40 w-full text-left cursor-pointer"
                        >
                          <i className={`hn ${item.icon} text-[16px]`} />
                          <span className="font-pixel text-xs tracking-wide font-medium">{item.name}</span>
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all font-semibold ${isActive
                          ? "bg-brand-purple text-white border-brand-outline shadow-pixel-sm translate-x-1"
                          : "bg-transparent text-brand-text border-transparent hover:bg-brand-border/40"
                          }`}
                      >
                        <i className={`hn ${item.icon} text-[16px]`} />
                        <span className="font-pixel text-xs tracking-wide font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="border-t-2 border-brand-border pt-4 text-center">
                <span className="font-pixel text-[11px] text-brand-text block">80others</span>
                <span className="text-[9px] text-brand-text/60 font-pixel block flex items-center justify-center gap-1">
                  Kết nối gia đình, vun đắp yêu thương <i className="hn hn-heart-solid text-brand-pink text-[9px]" />
                </span>
                <span className="text-[8px] text-brand-text/40 font-mono block mt-2">Phiên bản 1.0.0</span>
              </div>
            </div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main content window */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-card border-t-3 border-brand-outline px-4 py-2.5 flex justify-around items-center z-40">
        {navItems.map((item) => {
          const isActive = getIsActive(item.href, item.name);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-all ${isActive
                ? "text-brand-purple scale-110 font-bold"
                : "text-brand-text/60 hover:text-brand-text"
                }`}
            >
              <i className={`hn ${item.icon} ${isActive ? "text-brand-purple text-[22px]" : "text-brand-text/60 text-[20px]"} transition-all`} />
              <span className="text-[10px] mt-1 font-pixel tracking-wide font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* ================= PWA INSTALL GUIDE MODAL ================= */}
      {showInstallGuide && (
        <div className="fixed inset-0 bg-brand-text/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-brand-card border-3 border-brand-outline rounded-3xl shadow-pixel max-w-md w-full p-6 relative overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-pixel text-xl font-bold text-brand-text flex items-center gap-2">
                <i className="hn hn-download-alt-solid text-brand-purple text-lg" />
                Cài đặt 80others
              </h3>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="p-1.5 border-2 border-brand-outline rounded-lg bg-brand-bg hover:bg-brand-border cursor-pointer flex items-center justify-center transition-colors shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5"
                aria-label="Đóng"
              >
                <i className="hn hn-times-solid text-[16px] text-brand-text" />
              </button>
            </div>

            {/* Platform instructions */}
            <div className="space-y-4 font-cozy text-brand-text mb-6">
              {getInstallPlatform() === "ios" ? (
                <>
                  <p className="text-sm font-semibold text-brand-purple font-pixel">
                    Hãy làm theo các bước sau để cài đặt ứng dụng trên thiết bị iOS của bạn:
                  </p>
                  <ol className="space-y-3.5 text-xs text-brand-text/90 list-none pl-0">
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        1
                      </span>
                      <span className="pt-0.5">
                        Mở trang web bằng trình duyệt <strong>Safari</strong> trên iPhone hoặc iPad của bạn.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        2
                      </span>
                      <span className="pt-0.5">
                        Chạm vào biểu tượng chia sẻ <Share className="w-4 h-4 inline text-blue-500 mx-0.5" /> ở cuối Safari.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        3
                      </span>
                      <span className="pt-0.5 flex items-center gap-1.5 flex-wrap leading-relaxed">
                        Chọn <strong>Thêm vào MH chính</strong>
                        <span className="inline-flex p-1 border border-brand-outline bg-brand-bg rounded">
                          <i className="hn hn-plus-solid text-xs text-brand-text" />
                        </span>
                        từ danh sách các tùy chọn.
                      </span>
                    </li>
                  </ol>
                </>
              ) : getInstallPlatform() === "android" ? (
                <>
                  <p className="text-sm font-semibold text-brand-purple font-pixel">
                    Hãy làm theo các bước sau để cài đặt ứng dụng trên thiết bị Android của bạn:
                  </p>
                  <ol className="space-y-3.5 text-xs text-brand-text/90 list-none pl-0">
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        1
                      </span>
                      <span className="pt-0.5">
                        Mở trang web này bằng trình duyệt <strong>Google Chrome</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        2
                      </span>
                      <span className="pt-0.5 flex items-center gap-1.5 flex-wrap leading-relaxed">
                        Nhấn vào biểu tượng menu <strong>3 chấm</strong>
                        <span className="inline-flex p-1 border border-brand-outline bg-brand-bg rounded">
                          <i className="hn hn-ellipses-vertical-solid text-xs text-brand-text" />
                        </span>
                        ở góc trên bên phải.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        3
                      </span>
                      <span className="pt-0.5">
                        Chọn <strong>Cài đặt ứng dụng</strong> hoặc <strong>Thêm vào Màn hình chính</strong>.
                      </span>
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-brand-purple font-pixel">
                    Hãy làm theo các bước sau để cài đặt ứng dụng trên máy tính của bạn:
                  </p>
                  <ol className="space-y-3.5 text-xs text-brand-text/90 list-none pl-0">
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        1
                      </span>
                      <span className="pt-0.5">
                        Sử dụng trình duyệt <strong>Google Chrome</strong> hoặc <strong>Microsoft Edge</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        2
                      </span>
                      <span className="pt-0.5 flex items-center gap-1.5 flex-wrap leading-relaxed">
                        Nhấp vào biểu tượng <strong>Cài đặt</strong>
                        <span className="inline-flex p-1 border border-brand-outline bg-brand-bg rounded">
                          <i className="hn hn-download-alt-solid text-xs text-brand-text" />
                        </span>
                        trên thanh địa chỉ ở góc trên cùng bên phải.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        3
                      </span>
                      <span className="pt-0.5 flex items-center gap-1.5 flex-wrap leading-relaxed">
                        Hoặc nhấp vào menu <strong>3 chấm</strong>
                        <span className="inline-flex p-1 border border-brand-outline bg-brand-bg rounded">
                          <i className="hn hn-ellipses-vertical-solid text-xs text-brand-text" />
                        </span>
                        và chọn <strong>Cài đặt 80others...</strong>
                      </span>
                    </li>
                  </ol>
                </>
              )}
            </div>

            {/* Footer buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowInstallGuide(false)}
                className="flex-1 py-2.5 border-2 border-brand-outline rounded-xl bg-brand-bg hover:bg-brand-border text-brand-text font-pixel font-bold text-xs shadow-pixel-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center font-pixel"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FUNDRAISING MODAL ================= */}
      {isFundraisingModalOpen && (
        <div className="fixed inset-0 bg-brand-text/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-brand-card border-3 border-brand-outline rounded-3xl shadow-pixel max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in duration-200 text-center">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b-2 border-brand-border pb-3">
              <h3 className="font-pixel text-lg font-bold text-brand-text flex items-center gap-2">
                <i className="hn hn-heart-solid text-brand-pink text-lg animate-pulse" />
                Gây quỹ phát triển
              </h3>
              <button
                onClick={() => setIsFundraisingModalOpen(false)}
                className="p-1.5 border-2 border-brand-outline rounded-lg bg-brand-bg hover:bg-brand-border cursor-pointer flex items-center justify-center transition-colors shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5"
                aria-label="Đóng"
              >
                <i className="hn hn-times-solid text-[16px] text-brand-text" />
              </button>
            </div>

            {/* QR display */}
            <p className="text-xs text-brand-text/80 font-cozy leading-relaxed mb-4">
              Đồng hành cùng <strong>80others</strong> để xây dựng thêm nhiều tính năng kết nối gia đình ý nghĩa. Hãy quét mã QR dưới đây nhé!
            </p>
            
            <div className="flex flex-col items-center justify-center p-3.5 bg-white border-3 border-brand-outline rounded-2xl w-fit mx-auto shadow-pixel-sm mb-4">
              <img
                src="https://img.vietqr.io/image/MB-0397963469-compact.png?addInfo=GAYQUY80OTHERS&accountName=DO%20DUY%20DUNG"
                alt="Mã QR Gây Quỹ"
                className="w-44 h-44 object-contain"
              />
              <span className="text-[9px] font-pixel font-bold text-brand-outline mt-2 uppercase tracking-wide bg-brand-yellow/30 px-2 py-0.5 rounded">
                Cú pháp: GAYQUY80OTHERS
              </span>
            </div>

            <button
              onClick={() => setIsFundraisingModalOpen(false)}
              className="w-full py-2.5 border-2 border-brand-outline rounded-xl bg-brand-purple text-white font-pixel font-bold text-xs shadow-pixel-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};
