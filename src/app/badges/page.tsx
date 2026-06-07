"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

// Badge Data Interface
interface Badge {
  id: string;
  name: string;
  vietnameseName: string;
  description: string;
  requirement: string;
  category: "general" | "connection" | "challenge" | "community";
  progressVal: number;
  maxVal: number;
  unlocked: boolean;
  unlockedAt?: string;
  iconType: string;
}

// Pixel Art SVGs Component
const BadgeIcon: React.FC<{ type: string; isGrayscale?: boolean; size?: number }> = ({
  type,
  isGrayscale = false,
  size = 64,
}) => {
  const filterId = isGrayscale ? "url(#grayscale-filter)" : undefined;

  // Render SVG based on type
  const renderSVG = () => {
    switch (type) {
      case "family-starter":
        // Gold Key of Welcome
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="13" y="4" width="6" height="6" fill="#FBBF24" />
            <rect x="15" y="6" width="2" height="2" fill="#FEF08A" />
            <rect x="15" y="10" width="2" height="12" fill="#D97706" />
            <rect x="17" y="14" width="4" height="2" fill="#D97706" />
            <rect x="17" y="18" width="4" height="2" fill="#D97706" />
            <rect x="11" y="22" width="10" height="4" fill="#EF4444" />
            {/* Outline */}
            <path
              d="M12,3 h8 v2 h1 v4 h-1 v1 h-2 v12 h4 v4 h-4 v2 h-1 v2 h-12 v-2 h-1 v-4 h1 v-1 h4 v-12 h-2 v-1 h-1 v-4 h1 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "first-story":
        // Book & Quill
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="6" y="8" width="10" height="14" fill="#8B5CF6" />
            <rect x="16" y="8" width="10" height="14" fill="#A78BFA" />
            <rect x="4" y="22" width="24" height="2" fill="#6B21A8" />
            <rect x="20" y="4" width="2" height="6" fill="#10B981" />
            <rect x="22" y="6" width="2" height="8" fill="#34D399" />
            <rect x="8" y="11" width="6" height="2" fill="#EDE9FE" />
            <rect x="18" y="11" width="6" height="2" fill="#EDE9FE" />
            {/* Outline */}
            <path
              d="M5,7 h22 v15 h1 v2 h-26 v-2 h1 Z M19,3 h4 v2 h1 v4 h-1 v2 h-1 v2 h-1 v2 h-2 v-2 h1 v-2 h1 v-2 h1 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "active-listener":
        // Sparkly Chat Message
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="4" y="6" width="24" height="16" fill="#EC4899" />
            <rect x="6" y="8" width="20" height="12" fill="#F472B6" />
            <rect x="8" y="22" width="4" height="4" fill="#EC4899" />
            <rect x="6" y="24" width="2" height="2" fill="#EC4899" />
            <rect x="10" y="12" width="3" height="3" fill="#FFF" />
            <rect x="15" y="12" width="3" height="3" fill="#FFF" />
            <rect x="20" y="12" width="3" height="3" fill="#FFF" />
            {/* Sparkles */}
            <rect x="27" y="2" width="2" height="2" fill="#FBBF24" />
            <rect x="2" y="22" width="2" height="2" fill="#FBBF24" />
            {/* Outline */}
            <path
              d="M3,5 h26 v18 h-15 v4 h-2 v-4 h-9 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "family-meal":
        // Rice bowl / Dining table
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="8" y="16" width="16" height="10" fill="#F97316" />
            <rect x="10" y="18" width="12" height="6" fill="#FDBA74" />
            <rect x="6" y="10" width="20" height="4" fill="#FFF" />
            <rect x="12" y="26" width="8" height="2" fill="#EA580C" />
            {/* Steam lines */}
            <rect x="9" y="4" width="2" height="4" fill="#FED7AA" />
            <rect x="15" y="3" width="2" height="5" fill="#FED7AA" />
            <rect x="21" y="4" width="2" height="4" fill="#FED7AA" />
            {/* Outline */}
            <path
              d="M7,15 h18 v11 h-4 v2 h-10 v-2 h-4 Z M5,9 h22 v6 h-22 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "card-explorer":
        // Card Deck
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="4" y="8" width="12" height="18" fill="#3B82F6" />
            <rect x="6" y="10" width="8" height="14" fill="#93C5FD" />
            <rect x="8" y="14" width="4" height="6" fill="#3B82F6" />
            {/* Front tilted card */}
            <rect x="14" y="6" width="12" height="18" fill="#8B5CF6" />
            <rect x="16" y="8" width="8" height="14" fill="#C084FC" />
            <rect x="18" y="12" width="4" height="6" fill="#F472B6" />
            {/* Outline */}
            <path
              d="M3,7 h14 v1 h1 v16 h-12 v1 h-4 Z M13,5 h14 v18 h-14 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "family-connector":
        // Connected puzzle hearts
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="4" y="8" width="12" height="16" fill="#EF4444" />
            <rect x="16" y="8" width="12" height="16" fill="#EC4899" />
            <rect x="12" y="12" width="8" height="8" fill="#F87171" />
            <rect x="14" y="6" width="4" height="2" fill="#EF4444" />
            <rect x="14" y="24" width="4" height="2" fill="#EC4899" />
            {/* Outline */}
            <path
              d="M3,7 h26 v18 h-26 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "memory-keeper":
        // Polaroid Camera
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="4" y="8" width="24" height="18" fill="#6B7280" />
            <rect x="6" y="10" width="20" height="14" fill="#9CA3AF" />
            {/* Lens */}
            <rect x="11" y="12" width="10" height="10" fill="#374151" />
            <rect x="13" y="14" width="6" height="6" fill="#1D4ED8" />
            <rect x="14" y="15" width="2" height="2" fill="#60A5FA" />
            {/* Flash */}
            <rect x="6" y="12" width="4" height="3" fill="#FBBF24" />
            {/* Color stripe */}
            <rect x="23" y="10" width="3" height="14" fill="#EF4444" />
            {/* Outline */}
            <path
              d="M3,7 h26 v20 h-26 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "pioneer":
        // Pioneer Star
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="14" y="4" width="4" height="24" fill="#FBBF24" />
            <rect x="4" y="14" width="24" height="4" fill="#FBBF24" />
            <rect x="10" y="10" width="12" height="12" fill="#F59E0B" />
            <rect x="12" y="12" width="8" height="8" fill="#FEF08A" />
            <rect x="14" y="14" width="4" height="4" fill="#FFF" />
            {/* Outline */}
            <path
              d="M13,3 h6 v4 h4 v4 h4 v4 h-4 v4 h-4 v4 h-6 v-4 h-4 v-4 h-4 v-4 h4 v-4 h4 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "daily-champ":
        // Sun of Days
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="10" y="10" width="12" height="12" fill="#F59E0B" />
            <rect x="12" y="12" width="8" height="8" fill="#FBBF24" />
            {/* Rays */}
            <rect x="15" y="4" width="2" height="4" fill="#F59E0B" />
            <rect x="15" y="24" width="2" height="4" fill="#F59E0B" />
            <rect x="4" y="15" width="4" height="2" fill="#F59E0B" />
            <rect x="24" y="15" width="4" height="2" fill="#F59E0B" />
            <rect x="7" y="7" width="2" height="2" fill="#F59E0B" />
            <rect x="23" y="7" width="2" height="2" fill="#F59E0B" />
            <rect x="7" y="23" width="2" height="2" fill="#F59E0B" />
            <rect x="23" y="23" width="2" height="2" fill="#F59E0B" />
            {/* Sunglasses */}
            <rect x="12" y="14" width="8" height="2" fill="#1E293B" />
            {/* Outline */}
            <path
              d="M9,9 h14 v14 h-14 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "streak-master":
        // Hot Flame
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="14" y="6" width="4" height="20" fill="#EF4444" />
            <rect x="12" y="10" width="8" height="14" fill="#F97316" />
            <rect x="10" y="14" width="12" height="8" fill="#FBBF24" />
            <rect x="13" y="16" width="6" height="4" fill="#FEF08A" />
            {/* Sparks */}
            <rect x="8" y="18" width="2" height="2" fill="#EF4444" />
            <rect x="22" y="18" width="2" height="2" fill="#EF4444" />
            <rect x="15" y="3" width="2" height="2" fill="#FEF08A" />
            {/* Outline */}
            <path
              d="M13,5 h6 v4 h2 v4 h2 v11 h-14 v-11 h2 v-4 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "heart-sender":
        // Dual Nesting Hearts
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            {/* Large Pink Heart */}
            <rect x="6" y="8" width="20" height="12" fill="#EC4899" />
            <rect x="10" y="20" width="12" height="4" fill="#EC4899" />
            <rect x="14" y="24" width="4" height="2" fill="#EC4899" />
            <rect x="14" y="8" width="4" height="2" fill="#120A18" /> {/* Split */}
            {/* Small Inner Heart */}
            <rect x="11" y="11" width="10" height="6" fill="#F472B6" />
            <rect x="13" y="17" width="6" height="2" fill="#F472B6" />
            <rect x="15" y="11" width="2" height="2" fill="#120A18" />
            {/* Outline */}
            <path
              d="M5,7 h10 v2 h2 v-2 h10 v12 h-4 v4 h-4 v4 h-6 v-4 h-4 v-4 h-4 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      case "early-bird":
        // Cloud & Bird/Clock
        return (
          <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
            <rect x="10" y="8" width="12" height="12" fill="#06B6D4" />
            <rect x="12" y="10" width="8" height="8" fill="#22D3EE" />
            <rect x="15" y="11" width="2" height="4" fill="#0891B2" />
            <rect x="16" y="14" width="3" height="2" fill="#0891B2" />
            {/* Alarm bells */}
            <rect x="8" y="6" width="4" height="3" fill="#0891B2" />
            <rect x="20" y="6" width="4" height="3" fill="#0891B2" />
            {/* Feet */}
            <rect x="11" y="20" width="2" height="2" fill="#0891B2" />
            <rect x="19" y="20" width="2" height="2" fill="#0891B2" />
            {/* Outline */}
            <path
              d="M9,7 h14 v14 h-14 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`text-brand-text shrink-0 select-none ${isGrayscale ? "opacity-45" : ""}`}
    >
      <svg className="hidden">
        <defs>
          <filter id="grayscale-filter">
            <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: filterId, width: "100%", height: "100%" }}>
        {renderSVG()}
      </div>
    </div>
  );
};

export default function BadgeCollectionPage() {
  const { points, streak, completedCount } = useApp();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Mock achievement list matching 8/12 unlocked logic
  const initialBadges: Badge[] = [
    {
      id: "b1",
      name: "Family Starter",
      vietnameseName: "Khởi đầu gắn kết",
      description: "Thành công thiết lập hồ sơ và tham gia ngôi nhà chung 80others.",
      requirement: "Hoàn thành đăng ký tài khoản thành công.",
      category: "general",
      progressVal: 1,
      maxVal: 1,
      unlocked: true,
      unlockedAt: "01/06/2026",
      iconType: "family-starter",
    },
    {
      id: "b2",
      name: "First Story",
      vietnameseName: "Câu chuyện đầu tiên",
      description: "Chia sẻ tâm tư, tình cảm hoặc một khoảnh khắc nhỏ của bạn lên cộng đồng.",
      requirement: "Đăng 1 bài viết trong mục Cộng đồng.",
      category: "community",
      progressVal: 1,
      maxVal: 1,
      unlocked: true,
      unlockedAt: "02/06/2026",
      iconType: "first-story",
    },
    {
      id: "b3",
      name: "Active Listener",
      vietnameseName: "Người lắng nghe",
      description: "Tích cực trao đổi, gắn kết và để lại bình luận động viên các gia đình khác.",
      requirement: "Bình luận 10 lần trên bài đăng cộng đồng.",
      category: "community",
      progressVal: 4,
      maxVal: 10,
      unlocked: false,
      iconType: "active-listener",
    },
    {
      id: "b4",
      name: "Family Meal",
      vietnameseName: "Bữa cơm ấm áp",
      description: "Ghi lại khoảnh khắc gia đình quây quần cùng nhau ăn bữa tối trọn vẹn.",
      requirement: "Đăng tải 1 khoảnh khắc gia đình kèm ảnh.",
      category: "connection",
      progressVal: 1,
      maxVal: 1,
      unlocked: true,
      unlockedAt: "05/06/2026",
      iconType: "family-meal",
    },
    {
      id: "b5",
      name: "Card Explorer",
      vietnameseName: "Nhà thám hiểm",
      description: "Tích cực khám phá thế giới nội tâm của nhau qua các bộ thẻ bài trò chuyện.",
      requirement: "Rút và hoàn thành 10 thẻ Family Connection.",
      category: "connection",
      progressVal: 8,
      maxVal: 10,
      unlocked: false,
      iconType: "card-explorer",
    },
    {
      id: "b6",
      name: "Family Connector",
      vietnameseName: "Cầu nối yêu thương",
      description: "Đồng hành cùng cộng đồng thông qua các sự kiện gắn kết trực tiếp.",
      requirement: "Quét mã tham gia ít nhất 1 workshop gia đình của 80others.",
      category: "general",
      progressVal: 0,
      maxVal: 1,
      unlocked: false,
      iconType: "family-connector",
    },
    {
      id: "b7",
      name: "Memory Keeper",
      vietnameseName: "Người giữ kỷ niệm",
      description: "Lưu giữ những thói quen tốt và kỷ niệm đẹp qua các thử thách gia đình.",
      requirement: "Hoàn thành tổng cộng 25 thử thách ngày hoặc tuần.",
      category: "challenge",
      progressVal: 25,
      maxVal: 25,
      unlocked: true,
      unlockedAt: "06/06/2026",
      iconType: "memory-keeper",
    },
    {
      id: "b8",
      name: "80others Pioneer",
      vietnameseName: "Người tiên phong",
      description: "Người dùng đồng hành đặc biệt đóng góp xây dựng nền tảng từ giai đoạn đầu.",
      requirement: "Tham gia nền tảng 80others trong giai đoạn thử nghiệm Beta.",
      category: "general",
      progressVal: 1,
      maxVal: 1,
      unlocked: true,
      unlockedAt: "01/06/2026",
      iconType: "pioneer",
    },
    {
      id: "b9",
      name: "Daily Champ",
      vietnameseName: "Nhà vô địch ngày",
      description: "Hình thành thói quen kết nối liên tục mỗi ngày cùng người thân.",
      requirement: "Hoàn thành tất cả thử thách ngày trong 3 ngày liên tục.",
      category: "challenge",
      progressVal: 3,
      maxVal: 3,
      unlocked: true,
      unlockedAt: "07/06/2026",
      iconType: "daily-champ",
    },
    {
      id: "b10",
      name: "Streak Master",
      vietnameseName: "Bậc thầy bền bỉ",
      description: "Duy trì ngọn lửa yêu thương bền bỉ không ngắt quãng cùng gia đình.",
      requirement: "Đạt chuỗi kết nối (streak) hoạt động liên tục 7 ngày.",
      category: "challenge",
      progressVal: 7,
      maxVal: 7,
      unlocked: true,
      unlockedAt: "07/06/2026",
      iconType: "streak-master",
    },
    {
      id: "b11",
      name: "Heart Sender",
      vietnameseName: "Trái tim ấm áp",
      description: "Sẵn sàng chia sẻ sâu sắc và thấu hiểu nội tâm người thân qua bộ thẻ HEART.",
      requirement: "Rút và hoàn thành 5 lá bài thuộc bộ HEART CARD.",
      category: "connection",
      progressVal: 3,
      maxVal: 5,
      unlocked: false,
      iconType: "heart-sender",
    },
    {
      id: "b12",
      name: "Early Bird",
      vietnameseName: "Chú chim chăm chỉ",
      description: "Đón chào ngày mới và bắt đầu buổi trò chuyện ấm áp từ sáng sớm.",
      requirement: "Hoàn thành rút và chia sẻ thẻ bài đầu tiên trong ngày trước 7:00 AM.",
      category: "general",
      progressVal: 0,
      maxVal: 1,
      unlocked: false,
      iconType: "early-bird",
    },
  ];

  // Simulating custom loading skeleton for game experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Compute stats
  const totalBadges = initialBadges.length;
  const unlockedCount = initialBadges.filter((b) => b.unlocked).length;
  const unlockedPercent = Math.round((unlockedCount / totalBadges) * 100);

  // Filter logic
  const filteredBadges = initialBadges.filter((badge) => {
    // Search
    const matchesSearch =
      badge.vietnameseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.requirement.toLowerCase().includes(searchTerm.toLowerCase());

    // Status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unlocked" && badge.unlocked) ||
      (statusFilter === "locked" && !badge.unlocked);

    // Category
    const matchesCategory =
      categoryFilter === "all" || badge.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-cozy">
      {/* Back Button */}
      <div className="flex items-center">
        <Link
          href="/profile"
          className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-brand-outline rounded-xl bg-brand-card hover:bg-brand-border/40 font-pixel font-bold text-xs shadow-pixel-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          ← Trở lại hồ sơ
        </Link>
      </div>

      {/* 1. HEADER HERO */}
      <section className="bg-brand-card border-3 border-brand-outline p-6 md:p-8 rounded-3xl shadow-pixel text-center space-y-3 relative overflow-hidden">
        {/* Background pixel decorations */}
        <i className="absolute top-4 right-6 hn hn-sparkles-solid text-brand-yellow text-xl animate-bounce" />
        <i
          className="absolute bottom-4 left-6 hn hn-heart-solid text-brand-pink text-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        />

        <div className="w-16 h-16 rounded-full border-3 border-brand-outline bg-brand-yellow flex items-center justify-center mx-auto shadow-pixel-sm animate-float">
          <i className="hn hn-crown-solid text-2xl text-brand-text" />
        </div>
        <div className="space-y-1.5 max-w-lg mx-auto">
          <h2 className="font-pixel text-2xl md:text-3xl font-bold text-brand-text">
            🏆 Badge Collection
          </h2>
          <p className="text-xs md:text-sm text-brand-text/75 font-medium leading-relaxed font-pixel">
            Tích lũy các huy hiệu danh giá bằng cách hoàn thành các thẻ bài, thử thách gia đình và tương tác cộng đồng.
          </p>
        </div>
      </section>

      {/* 2. PROGRESS OVERVIEW CARD */}
      <section className="bg-brand-card border-3 border-brand-outline p-5 md:p-6 rounded-3xl shadow-pixel space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h3 className="font-pixel text-sm sm:text-base font-bold text-brand-text flex items-center gap-2">
            <i className="hn hn-chart-line text-[16px] text-brand-purple" />
            Tiến trình thu thập
          </h3>
          <span className="font-pixel text-xs sm:text-sm font-bold text-brand-purple bg-brand-purple/10 border-2 border-brand-purple px-2 py-0.5 rounded-lg shadow-pixel-sm select-none">
            {unlockedCount} / {totalBadges} badges unlocked ({unlockedPercent}%)
          </span>
        </div>

        <div className="space-y-1">
          <div className="h-5 bg-brand-bg border-3 border-brand-outline rounded-full overflow-hidden p-0.5 shadow-inner relative">
            <div
              className="h-full bg-brand-purple-light rounded-full border-r-3 border-brand-outline transition-all duration-1000"
              style={{ width: loading ? "0%" : `${unlockedPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-brand-text/50 font-bold block text-right font-pixel">
            Cố gắng mở khóa toàn bộ để nhận được danh hiệu "Trái tim gắn kết"!
          </span>
        </div>
      </section>

      {/* 3. INTERACTIVE FILTERS */}
      <section className="bg-brand-card border-3 border-brand-outline p-4 rounded-3xl shadow-pixel space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm huy hiệu theo tên hoặc điều kiện..."
              className="w-full pl-9 pr-4 py-2.5 border-2 border-brand-outline rounded-xl font-cozy text-xs text-brand-text bg-brand-bg/20 focus:outline-none focus:border-brand-purple transition-colors"
            />
            <i className="hn hn-search-solid absolute left-3.5 top-3.5 text-brand-text/50 text-xs" />
          </div>

          {/* Status Select Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2.5 rounded-xl border-2 font-pixel font-bold text-xs transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-brand-purple text-white border-brand-outline shadow-pixel-sm"
                  : "bg-transparent text-brand-text border-brand-border/40 hover:bg-brand-border/20 hover:border-brand-border"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setStatusFilter("unlocked")}
              className={`px-4 py-2.5 rounded-xl border-2 font-pixel font-bold text-xs transition-all cursor-pointer ${
                statusFilter === "unlocked"
                  ? "bg-brand-purple text-white border-brand-outline shadow-pixel-sm"
                  : "bg-transparent text-brand-text border-brand-border/40 hover:bg-brand-border/20 hover:border-brand-border"
              }`}
            >
              Đã mở khóa
            </button>
            <button
              onClick={() => setStatusFilter("locked")}
              className={`px-4 py-2.5 rounded-xl border-2 font-pixel font-bold text-xs transition-all cursor-pointer ${
                statusFilter === "locked"
                  ? "bg-brand-purple text-white border-brand-outline shadow-pixel-sm"
                  : "bg-transparent text-brand-text border-brand-border/40 hover:bg-brand-border/20 hover:border-brand-border"
              }`}
            >
              Chưa mở khóa
            </button>
          </div>
        </div>

        {/* Category switcher */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { key: "all", label: "Tất cả chủ đề" },
            { key: "general", label: "Chung 🌐" },
            { key: "connection", label: "Gắn kết ❤️" },
            { key: "challenge", label: "Thử thách 🏆" },
            { key: "community", label: "Cộng đồng 💬" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-3 py-1.5 rounded-lg border-2 font-pixel font-bold text-[10px] whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat.key
                  ? "bg-brand-outline text-brand-card border-brand-outline"
                  : "bg-brand-bg/30 text-brand-text/70 border-brand-border/30 hover:bg-brand-border/20 hover:border-brand-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. BADGES GRID */}
      {loading ? (
        // Loading skeleton
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-brand-card/50 border-3 border-brand-border p-4 rounded-2xl shadow-pixel-sm animate-pulse space-y-3 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-brand-border rounded-full" />
              <div className="h-4 bg-brand-border rounded w-3/4 mx-auto" />
              <div className="h-3 bg-brand-border rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : filteredBadges.length > 0 ? (
        // Render active badge grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`bg-brand-card border-3 border-brand-outline p-4 rounded-2xl cursor-pointer select-none transition-all flex flex-col items-center text-center justify-between gap-3 ${
                  badge.unlocked
                    ? "unlocked-glow hover:-translate-y-1 hover:shadow-pixel-hover"
                    : "opacity-80 hover:opacity-100 hover:border-brand-purple hover:-translate-y-0.5 shadow-pixel-sm"
                }`}
              >
                {/* Completed badge/Padlock status */}
                <div className="w-full flex justify-between items-center text-[9px] font-pixel font-bold">
                  <span
                    className={`px-1.5 py-0.2 rounded border ${
                      badge.category === "general"
                        ? "bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-950/40 dark:border-blue-900"
                        : badge.category === "connection"
                        ? "bg-pink-50 text-brand-pink border-brand-pink/20 dark:bg-pink-950/40 dark:border-pink-900"
                        : badge.category === "challenge"
                        ? "bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900"
                        : "bg-purple-50 text-brand-purple border-brand-purple/20 dark:bg-purple-950/40 dark:border-purple-900"
                    }`}
                  >
                    {badge.category.toUpperCase()}
                  </span>
                  {badge.unlocked ? (
                    <span className="text-green-500 flex items-center gap-0.5">
                      <i className="hn hn-check-circle-solid text-xs" /> Done
                    </span>
                  ) : (
                    <span className="text-brand-text/45 flex items-center gap-0.5">
                      <i className="hn hn-lock-solid text-xs" /> Lock
                    </span>
                  )}
                </div>

                {/* Badge Icon */}
                <BadgeIcon type={badge.iconType} isGrayscale={!badge.unlocked} size={64} />

                {/* Info */}
                <div className="space-y-0.5">
                  <h4 className="font-pixel font-bold text-xs sm:text-sm text-brand-text leading-tight truncate max-w-[150px]">
                    {badge.vietnameseName}
                  </h4>
                  <p className="text-[10px] text-brand-text/50 font-bold font-pixel">
                    {badge.name}
                  </p>
                </div>

                {/* Bottom detail date/progress bar */}
                <div className="w-full mt-1.5 pt-1.5 border-t-2 border-brand-border">
                  {badge.unlocked ? (
                    <span className="text-[9px] font-pixel font-bold text-green-500 block leading-tight">
                      Đạt được: {badge.unlockedAt}
                    </span>
                  ) : (
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[8px] font-bold font-pixel">
                        <span className="text-brand-text/40">Tiến độ</span>
                        <span className="text-brand-text/60">
                          {badge.progressVal}/{badge.maxVal}
                        </span>
                      </div>
                      <div className="h-1.5 bg-brand-bg border border-brand-outline rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-purple-light"
                          style={{ width: `${(badge.progressVal / badge.maxVal) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Empty State
        <div className="bg-brand-card border-3 border-brand-outline p-10 rounded-3xl shadow-pixel text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full border-3 border-brand-outline bg-brand-border/40 flex items-center justify-center mx-auto shadow-pixel-sm">
            <i className="hn hn-folder-solid text-2xl text-brand-text/40" />
          </div>
          <div className="space-y-1">
            <h4 className="font-pixel font-bold text-sm text-brand-text">Không tìm thấy huy hiệu nào</h4>
            <p className="text-xs text-brand-text/60 leading-relaxed font-cozy">
              Không tìm thấy huy hiệu nào phù hợp với từ khóa tìm kiếm hoặc bộ lọc hiện tại. Hãy thử thay đổi bộ lọc nhé!
            </p>
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setCategoryFilter("all");
            }}
            className="px-4 py-2 border-2 border-brand-outline rounded-xl bg-brand-purple-light/20 text-brand-text font-pixel font-bold text-xs hover:bg-brand-purple-light/30 transition-colors shadow-pixel-sm active:translate-y-0.5"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* 5. DETAILS MODAL */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-brand-text/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-brand-card border-3 border-brand-outline rounded-3xl shadow-pixel max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in duration-200 text-center">
            {/* Ribbon Background Sparkles for unlocked achievement */}
            {selectedBadge.unlocked && (
              <>
                <i className="absolute top-12 left-8 hn hn-sparkles-solid text-brand-yellow text-base animate-bounce" />
                <i className="absolute bottom-12 right-8 hn hn-sparkles-solid text-brand-yellow text-base animate-bounce" style={{ animationDelay: '0.5s' }} />
              </>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b-2 border-brand-border pb-3">
              <h3 className="font-pixel text-sm sm:text-base font-bold text-brand-text flex items-center gap-2">
                <i className="hn hn-crown-solid text-brand-yellow text-base" />
                Chi tiết huy hiệu
              </h3>
              <button
                onClick={() => setSelectedBadge(null)}
                className="p-1.5 border-2 border-brand-outline rounded-lg bg-brand-bg hover:bg-brand-border cursor-pointer flex items-center justify-center transition-colors shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5"
                aria-label="Đóng"
              >
                <i className="hn hn-times-solid text-[16px] text-brand-text" />
              </button>
            </div>

            {/* Icon showcase container */}
            <div className={`p-5 rounded-2xl border-3 border-brand-outline w-28 h-28 mx-auto flex items-center justify-center mb-4 shadow-pixel-sm relative overflow-hidden ${
              selectedBadge.unlocked
                ? "bg-brand-yellow/10 border-brand-yellow animate-float"
                : "bg-brand-bg/50 border-brand-border"
            }`}>
              {/* Dynamic shining background gradient */}
              {selectedBadge.unlocked && (
                <div className="absolute inset-0 bg-radial-gradient from-brand-yellow/20 to-transparent animate-pulse" />
              )}
              <BadgeIcon type={selectedBadge.iconType} isGrayscale={!selectedBadge.unlocked} size={80} />
            </div>

            {/* Info details */}
            <div className="space-y-3 mb-6">
              <div className="space-y-1">
                <h4 className="font-pixel font-bold text-base text-brand-text">
                  {selectedBadge.vietnameseName}
                </h4>
                <p className="text-xs text-brand-text/50 font-bold font-pixel">
                  {selectedBadge.name}
                </p>
              </div>

              <span className={`inline-block font-pixel text-[9px] font-bold border px-2 py-0.5 rounded-lg ${
                selectedBadge.unlocked
                  ? "bg-green-50 text-green-500 border-green-200 dark:bg-green-950/40 dark:border-green-900"
                  : "bg-brand-bg text-brand-text/40 border-brand-border"
              }`}>
                {selectedBadge.unlocked ? "✓ COMPLETED (ĐÃ ĐẠT)" : "🔒 LOCKED (CHƯA ĐẠT)"}
              </span>

              <div className="space-y-2 text-left bg-brand-bg/25 border-2 border-brand-border p-3.5 rounded-2xl">
                <div>
                  <span className="text-[10px] font-bold text-brand-text/45 uppercase block font-pixel">Mô tả</span>
                  <p className="text-xs text-brand-text/90 font-medium font-cozy leading-relaxed">
                    {selectedBadge.description}
                  </p>
                </div>
                
                <div className="pt-2 border-t-2 border-brand-border/40">
                  <span className="text-[10px] font-bold text-brand-text/45 uppercase block font-pixel">Điều kiện</span>
                  <p className="text-xs text-brand-text/90 font-medium font-cozy leading-relaxed">
                    {selectedBadge.requirement}
                  </p>
                </div>
              </div>

              {/* Progress detail */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between text-[10px] font-bold font-pixel">
                  <span className="text-brand-text/50">Tiến trình</span>
                  <span className="text-brand-text/80">
                    {selectedBadge.progressVal} / {selectedBadge.maxVal}
                  </span>
                </div>
                <div className="h-3.5 bg-brand-bg border-2 border-brand-outline rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      selectedBadge.unlocked ? "bg-green-400" : "bg-brand-purple-light"
                    }`}
                    style={{ width: `${(selectedBadge.progressVal / selectedBadge.maxVal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Date Unlocked display */}
              {selectedBadge.unlocked && selectedBadge.unlockedAt && (
                <div className="text-[10px] font-pixel font-bold text-green-500 bg-green-50 dark:bg-green-950/30 py-1.5 px-3 rounded-xl border border-green-200 dark:border-green-900/40 inline-flex items-center gap-1">
                  <i className="hn hn-check-circle-solid text-sm" />
                  Đạt được vào ngày: {selectedBadge.unlockedAt}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 border-2 border-brand-outline rounded-xl bg-brand-purple text-white font-pixel font-bold text-xs shadow-pixel hover:shadow-pixel-hover active:translate-y-0 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
