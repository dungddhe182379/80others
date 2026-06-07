"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";

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
    { name: "Bộ sưu tập", href: "/cards", icon: "hn-book-bookmark-solid" }, // Links to cards as deck library
    { name: "Cộng đồng", href: "/community", icon: "hn-users-solid" },
    { name: "Hồ sơ", href: "/profile", icon: "hn-user-solid" },
    { name: "Cài đặt", href: "/profile", icon: "hn-cog-solid" },
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
      if (name === "Bộ sưu tập") {
        return !isTodayTab;
      }
    }
    
    if (normBasePath === "/profile") {
      if (name === "Cài đặt") {
        return false;
      }
    }
    
    return true;
  };

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-brand-card border-b-3 border-brand-outline sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 border-2 border-brand-outline rounded-lg overflow-hidden bg-brand-bg flex items-center justify-center shadow-pixel-sm">
            <Image
              src="/assets/logo.jpg"
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
                alt="Đỗ Duy Dũng avatar"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="text-left leading-tight hidden lg:block">
              <p className="font-pixel font-bold text-sm text-brand-text">Đỗ Duy Dũng</p>
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
          <div className="relative w-8 h-8 border border-brand-outline rounded-md overflow-hidden bg-brand-bg">
            <Image
              src="/assets/logo.jpg"
              alt="80others logo"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="font-pixel text-lg font-bold tracking-tight text-brand-text">80others</span>
        </Link>

        <div className="flex items-center gap-2">
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
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-semibold ${
                    isActive
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
                  alt="Đỗ Duy Dũng avatar"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <h4 className="font-pixel font-bold text-sm text-brand-text">Đỗ Duy Dũng</h4>
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

            {/* Little stats */}
            <div className="grid grid-cols-3 gap-1 border-t-2 border-brand-border pt-3 text-center text-xs">
              <div>
                <span className="block font-pixel font-bold text-brand-purple-light text-sm">{points}</span>
                <span className="text-[8px] text-brand-text/70 uppercase font-bold font-pixel">Điểm</span>
              </div>
              <div>
                <span className="block font-pixel font-bold text-orange-500 text-sm">{streak}</span>
                <span className="text-[8px] text-brand-text/70 uppercase font-bold font-pixel">Chuỗi</span>
              </div>
              <div>
                <span className="block font-pixel font-bold text-brand-pink text-sm">{completedCount}</span>
                <span className="text-[8px] text-brand-text/70 uppercase font-bold font-pixel">Thẻ</span>
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
                    <div className="relative w-8 h-8 border border-brand-outline rounded-md overflow-hidden bg-brand-bg">
                      <Image
                        src="/assets/logo.jpg"
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
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all font-semibold ${
                          isActive
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
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-all ${
                isActive
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
    </>
  );
};
