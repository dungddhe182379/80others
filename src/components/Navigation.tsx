"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Home,
  Layers,
  Trophy,
  Users,
  User,
  Settings,
  Bell,
  Menu,
  X,
  Flame,
  Heart,
  BookOpen,
  HelpCircle,
  Gift
} from "lucide-react";

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
  const { points, streak, completedCount } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Thẻ", href: "/cards?tab=today", icon: Layers },
    { name: "Thử thách", href: "/challenges", icon: Trophy },
    { name: "Cộng đồng", href: "/community", icon: Users },
    { name: "Hồ sơ", href: "/profile", icon: User },
  ];

  const sidebarItems = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Thẻ hôm nay", href: "/cards?tab=today", icon: Layers },
    { name: "Thử thách", href: "/challenges", icon: Trophy },
    { name: "Bộ sưu tập", href: "/cards", icon: BookOpen }, // Links to cards as deck library
    { name: "Cộng đồng", href: "/community", icon: Users },
    { name: "Hồ sơ", href: "/profile", icon: User },
    { name: "Cài đặt", href: "/profile", icon: Settings },
  ];

  const getIsActive = (href: string, name: string) => {
    const basePath = href.split("?")[0];
    if (pathname !== basePath) return false;
    
    if (basePath === "/cards") {
      if (name === "Thẻ hôm nay" || name === "Thẻ") {
        return tab === "today";
      }
      if (name === "Bộ sưu tập") {
        return tab !== "today";
      }
    }
    return true;
  };

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b-3 border-brand-text sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 border-2 border-brand-text rounded-lg overflow-hidden bg-brand-bg flex items-center justify-center shadow-pixel-sm">
            <Image
              src="/logo.jpg"
              alt="80others logo"
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <span className="font-pixel text-2xl font-bold tracking-tight text-brand-text flex items-center gap-1">
            80others<span className="text-brand-pink text-xs animate-bounce">✨</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Streak 🔥 */}
          <div className="flex items-center gap-2 bg-orange-50 border-2 border-brand-text px-3 py-1.5 rounded-lg shadow-pixel-sm">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
            <div className="text-left leading-none">
              <span className="font-pixel text-sm font-bold block">{streak}</span>
              <span className="text-[10px] text-brand-text/70 font-semibold font-cozy">Chuỗi gia đình</span>
            </div>
          </div>

          {/* Connection Points ❤️ */}
          <div className="flex items-center gap-2 bg-pink-50 border-2 border-brand-text px-3 py-1.5 rounded-lg shadow-pixel-sm">
            <Heart className="w-5 h-5 text-brand-pink fill-brand-pink animate-pulse" />
            <div className="text-left leading-none">
              <span className="font-pixel text-sm font-bold block">{points.toLocaleString("vi-VN")}</span>
              <span className="text-[10px] text-brand-text/70 font-semibold font-cozy">Điểm kết nối</span>
            </div>
          </div>

          {/* Notifications Bell */}
          <button className="relative p-2 border-2 border-brand-text rounded-lg bg-brand-bg hover:bg-brand-border transition-colors shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5">
            <Bell className="w-5 h-5 text-brand-text" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-pink rounded-full border border-brand-text" />
          </button>

          {/* User Widget header */}
          <Link
            href="/profile"
            className="flex items-center gap-2.5 pl-4 border-l-2 border-brand-border hover:opacity-80 transition-opacity"
          >
            <div className="relative w-9 h-9 rounded-full border-2 border-brand-text overflow-hidden bg-brand-purple-light shadow-pixel-sm">
              <Image
                src="/pixel_avatar.png"
                alt="Đỗ Duy Dũng avatar"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="text-left leading-tight hidden lg:block">
              <p className="font-bold text-sm text-brand-text">Đỗ Duy Dũng</p>
              <span className="text-[11px] font-pixel text-brand-purple-light font-bold bg-brand-text px-1.5 py-0.2 rounded">Lv.5</span>
            </div>
          </Link>
        </div>
      </header>

      {/* ================= MOBILE HEADER ================= */}
      <header className="flex md:hidden items-center justify-between px-4 py-3.5 bg-white border-b-3 border-brand-text sticky top-0 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 border-2 border-brand-text rounded-lg bg-brand-bg shadow-pixel-sm active:translate-y-0.5"
        >
          <Menu className="w-5 h-5 text-brand-text" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 border border-brand-text rounded-md overflow-hidden bg-brand-bg">
            <Image
              src="/logo.jpg"
              alt="80others logo"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="font-pixel text-lg font-bold tracking-tight text-brand-text">80others</span>
        </Link>

        <button className="p-2 border-2 border-brand-text rounded-lg bg-brand-bg shadow-pixel-sm active:translate-y-0.5">
          <Bell className="w-5 h-5 text-brand-text" />
        </button>
      </header>

      <div className="flex flex-1">
        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden md:flex flex-col w-64 bg-brand-bg border-r-3 border-brand-text p-4 justify-between h-[calc(100vh-77px)] sticky top-[77px] z-30 shrink-0">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = getIsActive(item.href, item.name);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-semibold ${
                    isActive
                      ? "bg-brand-purple text-white border-brand-text shadow-pixel-sm translate-x-1"
                      : "bg-transparent text-brand-text border-transparent hover:bg-brand-border/40 hover:border-brand-border"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-brand-text"}`} />
                  <span className="font-pixel text-[13px] tracking-wide font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Sidebar Profile Info Card Widget */}
          <div className="bg-white border-3 border-brand-text p-4 rounded-2xl shadow-pixel relative overflow-hidden mt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-full border-2 border-brand-text overflow-hidden bg-brand-purple-light shadow-pixel-sm shrink-0">
                <Image
                  src="/pixel_avatar.png"
                  alt="Đỗ Duy Dũng avatar"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <h4 className="font-bold text-sm text-brand-text">Đỗ Duy Dũng</h4>
                <span className="text-[10px] font-pixel text-brand-purple-light font-bold bg-brand-text px-1.5 py-0.2 rounded">Lv.5</span>
              </div>
            </div>

            {/* XP progress */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] font-bold mb-1 font-cozy">
                <span>XP</span>
                <span>620 / 900 XP</span>
              </div>
              <div className="h-3.5 bg-brand-bg border-2 border-brand-text rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-brand-purple-light rounded-full border border-brand-text"
                  style={{ width: "68.8%" }}
                />
              </div>
            </div>

            {/* Little stats */}
            <div className="grid grid-cols-3 gap-1 border-t-2 border-brand-border pt-3 text-center text-xs">
              <div>
                <span className="block font-pixel font-bold text-brand-purple-light text-sm">{points}</span>
                <span className="text-[8px] text-brand-text/70 uppercase font-bold">Điểm</span>
              </div>
              <div>
                <span className="block font-pixel font-bold text-orange-500 text-sm">{streak}</span>
                <span className="text-[8px] text-brand-text/70 uppercase font-bold">Chuỗi</span>
              </div>
              <div>
                <span className="block font-pixel font-bold text-brand-pink text-sm">{completedCount}</span>
                <span className="text-[8px] text-brand-text/70 uppercase font-bold">Thẻ</span>
              </div>
            </div>

            <Link
              href="/profile"
              className="mt-3.5 flex items-center justify-center w-full py-1.5 border-2 border-brand-text rounded-xl bg-brand-purple-light/20 text-brand-text font-bold text-xs hover:bg-brand-purple-light/40 transition-colors active:translate-y-0.5"
            >
              Xem chi tiết hồ sơ →
            </Link>
          </div>
        </aside>

        {/* ================= MOBILE NAV DRAWER (SIDEBAR HAMBURGER MENU) ================= */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-brand-text/60 backdrop-blur-sm z-50 md:hidden flex">
            <div className="w-64 bg-brand-bg border-r-3 border-brand-text p-5 flex flex-col justify-between h-full animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 border border-brand-text rounded-md overflow-hidden bg-brand-bg">
                      <Image
                        src="/logo.jpg"
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
                    className="p-1 border border-brand-text rounded bg-white"
                  >
                    <X className="w-5 h-5 text-brand-text" />
                  </button>
                </div>

                <div className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = getIsActive(item.href, item.name);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all font-semibold ${
                          isActive
                            ? "bg-brand-purple text-white border-brand-text shadow-pixel-sm translate-x-1"
                            : "bg-transparent text-brand-text border-transparent hover:bg-brand-border/40"
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                        <span className="font-pixel text-xs tracking-wide font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="border-t-2 border-brand-border pt-4 text-center">
                <span className="font-pixel text-[11px] text-brand-text block">80others</span>
                <span className="text-[9px] text-brand-text/60 font-cozy block">Kết nối gia đình, vun đắp yêu thương ❤️</span>
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-3 border-brand-text px-4 py-2.5 flex justify-around items-center z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
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
              <Icon className="w-5.5 h-5.5 stroke-[2.25]" />
              <span className="text-[10px] mt-1 font-pixel tracking-wide font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
