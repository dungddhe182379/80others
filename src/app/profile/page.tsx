"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { triggerHeart } from "@/components/HeartRain";


export default function ProfilePage() {
  const { points, streak, completedCount } = useApp();

  const handleActionClick = (name: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 2);
    alert(`Bạn đã chọn: "${name}". Tính năng này đang được phát triển thêm.`);
  };

  const badgeConfig = [
    {
      icon: "hn-fire-solid",
      iconColor: "text-orange-500",
      name: "Khởi đầu",
      desc: "Chơi liên tiếp 1 ngày",
      color: "badge-orange"
    },
    {
      icon: "hn-bolt-solid",
      iconColor: "text-brand-purple",
      name: "Kết nối đầu",
      desc: "Hoàn thành 5 thẻ WARM",
      color: "badge-purple"
    },
    {
      icon: "hn-heart-solid",
      iconColor: "text-brand-pink",
      name: "Trái tim ấm",
      desc: "Hoàn thành 5 thẻ HEART",
      color: "badge-pink"
    },
    {
      icon: "hn-home-solid",
      iconColor: "text-amber-500",
      name: "Gắn kết",
      desc: "Hoàn thành 3 thử thách ngày",
      color: "badge-yellow"
    }
  ];

  const menuItems = [
    { name: "Gia đình của tôi", icon: "hn-users-solid" },
    { name: "Nhật ký kết nối", icon: "hn-history-solid" },
    { name: "Lưu trữ thẻ", icon: "hn-folder-solid" },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-6">
      
      {/* 1. PROFILE PROFILE CARD */}
      <section className="bg-brand-card border-3 border-brand-outline p-5 rounded-3xl shadow-pixel relative overflow-hidden">
        {/* Settings button */}
        <button 
          onClick={(e) => handleActionClick("Cài đặt", e)}
          className="absolute top-4 right-4 p-1.5 border-2 border-brand-outline rounded-lg hover:bg-brand-bg transition-colors"
        >
          <i className="hn hn-settings-solid text-base text-brand-text" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3">
          {/* Pixel Avatar */}
          <div className="relative w-24 h-24 rounded-full border-3 border-brand-outline overflow-hidden bg-brand-purple-light shadow-pixel">
            <Image
              src="/assets/avatars/avatar.png"
              alt="Đỗ Duy Dũng Profile"
              fill
              sizes="96px"
              priority
              className="object-cover"
            />
          </div>

          <div className="space-y-1">
            <h2 className="font-pixel text-xl font-bold text-brand-text flex items-center justify-center gap-1.5">
              Đỗ Duy Dũng
            </h2>
            <span className="inline-block text-xs font-pixel text-brand-purple-light font-bold bg-brand-outline px-2.5 py-0.5 rounded-md">
              Lv.5
            </span>
          </div>

          {/* XP progress bar */}
          <div className="w-full max-w-xs space-y-1.5 pt-2">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-brand-text/50">XP Kinh nghiệm</span>
              <span>620 / 900 XP</span>
            </div>
            <div className="h-4 bg-brand-bg border-2 border-brand-outline rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-brand-purple-light rounded-full border border-brand-outline"
                style={{ width: "68.8%" }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic indicators statistics grid */}
        <div className="grid grid-cols-3 gap-2 border-t-2 border-brand-border pt-4 mt-5 text-center text-xs">
          <div className="space-y-0.5">
            <span className="block font-pixel font-bold text-brand-pink text-base">{points.toLocaleString("vi-VN")}</span>
            <span className="text-[9px] text-brand-text/60 font-bold uppercase tracking-wider block">Điểm kết nối</span>
          </div>
          <div className="space-y-0.5 border-x-2 border-brand-border">
            <span className="block font-pixel font-bold text-orange-500 text-base">{streak} ngày</span>
            <span className="text-[9px] text-brand-text/60 font-bold uppercase tracking-wider block">Chuỗi gia đình</span>
          </div>
          <div className="space-y-0.5">
            <span className="block font-pixel font-bold text-brand-purple-light text-base">{completedCount} / 100</span>
            <span className="text-[9px] text-brand-text/60 font-bold uppercase tracking-wider block">Thẻ hoàn thành</span>
          </div>
        </div>
      </section>

      {/* 2. HUY HIỆU BADGES DISPLAY */}
      <section className="bg-brand-card border-3 border-brand-outline p-5 rounded-3xl shadow-pixel">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3 mb-4">
          <h3 className="font-pixel text-base font-bold flex items-center gap-1.5">
            <i className="hn hn-trophy-solid text-brand-yellow text-[16px]" />
            Huy hiệu của bạn
          </h3>
          <span className="text-[10px] font-bold text-brand-purple hover:underline cursor-pointer font-pixel">Xem tất cả</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {badgeConfig.map((badge, i) => (
            <div 
              key={i}
              className={`border-2 border-brand-outline p-3 rounded-2xl flex items-center gap-2.5 shadow-pixel-sm ${badge.color}`}
            >
              <i className={`hn ${badge.icon} text-[24px] ${badge.iconColor} shrink-0`} />
              <div className="leading-tight">
                <h4 className="font-pixel text-xs font-bold text-brand-text">{badge.name}</h4>
                <p className="text-[9px] text-brand-text/60 font-semibold">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FUNCTION MENU LIST */}
      <section className="bg-brand-card border-3 border-brand-outline p-3 rounded-3xl shadow-pixel space-y-1">
        {menuItems.map((item, i) => {
          return (
            <button
              key={i}
              onClick={(e) => handleActionClick(item.name, e)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-brand-bg transition-colors text-left text-xs sm:text-sm font-bold text-brand-text group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <i className={`hn ${item.icon} text-base text-brand-text/70`} />
                <span className="font-cozy">{item.name}</span>
              </div>
              <i className="hn hn-arrow-right-solid text-sm text-brand-text/40 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          );
        })}

        <button
          onClick={(e) => handleActionClick("Đăng xuất", e)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-colors text-left text-xs sm:text-sm font-bold text-brand-text/80 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <i className="hn hn-logout-solid text-base text-red-500" />
            <span className="font-cozy">Đăng xuất</span>
          </div>
          <i className="hn hn-arrow-right-solid text-sm text-brand-text/30 shrink-0" />
        </button>
      </section>

    </div>
  );
}
