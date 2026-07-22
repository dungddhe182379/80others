"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Activity,
  Trophy,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Search,
  Download,
  BellRing,
  Calendar,
  Filter,
  CheckCircle2,
  MoreVertical,
  Sparkles,
  ShieldCheck,
  Eye,
  UserX,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Monitor,
  Clock,
  Heart,
  Crown,
  Share2,
  RefreshCw,
  X,
  Send,
  AlertCircle,
  LogOut,
  BarChart3,
  MousePointerClick,
  AlertTriangle,
  Layers,
  ArrowDownRight,
  HelpCircle
} from "lucide-react";

// Mock Data Definitions
interface MetricCardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: React.ReactNode;
  colorBg: string;
  colorBorder: string;
  colorText: string;
}

interface UserRecord {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: "VIP" | "Thành viên" | "Mới";
  streak: number;
  points: number;
  joinedDate: string;
  status: "Hoạt động" | "Ngoại tuyến" | "Tạm khóa";
}

interface PageUsageData {
  name: string;
  path: string;
  views: number;
  percentage: number;
  avgTime: string;
  icon: string;
  color: string;
}

interface DropOffData {
  contentName: string;
  category: string;
  dropRate: number;
  usersLost: number;
  reason: string;
  riskLevel: "Cao" | "Trung bình" | "Thấp";
}

// Mock User Data in 1-month campaign (June 2026 - Early July 2026)
const mockUsers: UserRecord[] = [
  { id: "USR-362", name: "Nguyễn Văn An", avatar: "👨‍👩‍👦", email: "an.nguyen@gmail.com", role: "VIP", streak: 28, points: 1250, joinedDate: "04/07/2026", status: "Hoạt động" },
  { id: "USR-361", name: "Trần Thị Mai", avatar: "👩‍🍳", email: "mai.tran@yahoo.com", role: "Thành viên", streak: 18, points: 640, joinedDate: "02/07/2026", status: "Hoạt động" },
  { id: "USR-360", name: "Lê Minh Trí", avatar: "👨‍💻", email: "tri.le@tech.io", role: "VIP", streak: 30, points: 2890, joinedDate: "28/06/2026", status: "Hoạt động" },
  { id: "USR-359", name: "Phạm Phương Thảo", avatar: "👩‍🎨", email: "thao.pham@art.net", role: "Mới", streak: 12, points: 420, joinedDate: "22/06/2026", status: "Hoạt động" },
  { id: "USR-358", name: "Đặng Hoàng Nam", avatar: "🚴‍♂️", email: "nam.dang@sports.vn", role: "Thành viên", streak: 20, points: 980, joinedDate: "15/06/2026", status: "Ngoại tuyến" },
  { id: "USR-357", name: "Vũ Bảo Ngọc", avatar: "👩‍🔬", email: "ngoc.vu@edu.vn", role: "VIP", streak: 25, points: 1840, joinedDate: "10/06/2026", status: "Hoạt động" },
  { id: "USR-356", name: "Bùi Anh Tuấn", avatar: "🎧", email: "tuan.bui@music.com", role: "Mới", streak: 5, points: 140, joinedDate: "05/06/2026", status: "Tạm khóa" },
  { id: "USR-355", name: "Hoàng Gia Hưng", avatar: "👨‍🌾", email: "hung.hoang@farm.vn", role: "VIP", streak: 30, points: 3510, joinedDate: "01/06/2026", status: "Hoạt động" },
];

// Most Visited & Used Pages Data
const pageUsageStats: PageUsageData[] = [
  { name: "Thẻ Hôm Nay", path: "/cards?tab=today", views: 604, percentage: 42.5, avgTime: "4m 12s", icon: "hn-grid-solid", color: "bg-purple-500" },
  { name: "Thử Thách Gia Đình", path: "/challenges", views: 398, percentage: 28.0, avgTime: "3m 45s", icon: "hn-trophy-solid", color: "bg-pink-500" },
  { name: "Cộng Đồng Kết Nối", path: "/community", views: 216, percentage: 15.2, avgTime: "2m 30s", icon: "hn-users-solid", color: "bg-emerald-500" },
  { name: "Huy Hiệu & Thành Tích", path: "/badges", views: 125, percentage: 8.8, avgTime: "1m 15s", icon: "hn-crown-solid", color: "bg-amber-500" },
  { name: "Hồ Sơ Cá Nhân", path: "/profile", views: 78, percentage: 5.5, avgTime: "0m 50s", icon: "hn-user-solid", color: "bg-blue-500" },
];

// Drop-Off Content Analysis Data
const dropOffStats: DropOffData[] = [
  { contentName: "Form Hướng Dẫn Thông Báo (Onboarding)", category: "Quy trình đăng ký", dropRate: 18.5, usersLost: 67, reason: "Popup xin quyền thông báo trên trình duyệt iOS bị từ chối", riskLevel: "Cao" },
  { contentName: "Thử Thách Tuần 3: 'Viết Nhật Ký 100 Chữ'", category: "Nội dung thử thách", dropRate: 12.4, usersLost: 45, reason: "Yêu cầu nhập văn bản quá dài trên điện thoại di động", riskLevel: "Trung bình" },
  { contentName: "Modal Gây Quỹ Cho Nhóm", category: "Tính năng liên kết", dropRate: 8.2, usersLost: 30, reason: "Chưa có thông tin chuyển khoản QR tự động", riskLevel: "Trung bình" },
  { contentName: "Trang Danh Sách Huy Hiệu Khóa", category: "Trang danh mục", dropRate: 5.1, usersLost: 18, reason: "Cần thêm huy hiệu mới để duy trì động lực", riskLevel: "Thấp" },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"w1" | "w2" | "w3" | "w4" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastTitle, setBroadcastTitle] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 4-Week Campaign Timeline Data (June 1, 2026 - July 5, 2026)
  const growthTimeline = useMemo(() => {
    switch (timeRange) {
      case "w1":
        return [
          { label: "01/06", users: 20, active: 6, cards: 120 },
          { label: "03/06", users: 45, active: 12, cards: 180 },
          { label: "05/06", users: 68, active: 18, cards: 260 },
          { label: "07/06", users: 85, active: 22, cards: 350 },
        ];
      case "w2":
        return [
          { label: "08/06", users: 102, active: 26, cards: 450 },
          { label: "10/06", users: 128, active: 30, cards: 560 },
          { label: "12/06", users: 155, active: 34, cards: 680 },
          { label: "14/06", users: 178, active: 38, cards: 790 },
        ];
      case "w3":
        return [
          { label: "15/06", users: 205, active: 40, cards: 890 },
          { label: "17/06", users: 230, active: 42, cards: 990 },
          { label: "19/06", users: 252, active: 44, cards: 1100 },
          { label: "21/06", users: 275, active: 45, cards: 1210 },
        ];
      case "w4":
        return [
          { label: "22/06", users: 298, active: 46, cards: 1280 },
          { label: "25/06", users: 322, active: 47, cards: 1330 },
          { label: "28/06", users: 345, active: 47, cards: 1380 },
          { label: "05/07", users: 362, active: 48, cards: 1420 },
        ];
      case "all":
      default:
        return [
          { label: "Tuần 1 (01-07/06)", users: 85, active: 22, cards: 350 },
          { label: "Tuần 2 (08-14/06)", users: 178, active: 38, cards: 790 },
          { label: "Tuần 3 (15-21/06)", users: 275, active: 45, cards: 1210 },
          { label: "Tuần 4 (22/06-05/07)", users: 362, active: 48, cards: 1420 },
        ];
    }
  }, [timeRange]);

  // Peak activity hours during campaign
  const hourlyActivity = [
    { hour: "0h", val: 12 }, { hour: "3h", val: 4 }, { hour: "6h", val: 38 },
    { hour: "7h", val: 85 }, { hour: "8h", val: 94 }, { hour: "9h", val: 72 },
    { hour: "12h", val: 64 }, { hour: "15h", val: 45 }, { hour: "18h", val: 58 },
    { hour: "20h", val: 98 }, { hour: "21h", val: 110 }, { hour: "22h", val: 82 },
  ];

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((usr) => {
      const matchesSearch =
        usr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usr.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usr.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || usr.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleExportCSV = () => {
    const headers = "ID,Tên,Email,Loại,Chuỗi Streak,Điểm,Ngày tham gia,Trạng thái\n";
    const rows = mockUsers
      .map(
        (u) =>
          `"${u.id}","${u.name}","${u.email}","${u.role}",${u.streak},${u.points},"${u.joinedDate}","${u.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `80others_campaign_report_June2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Đã tải xuống file tổng kết chiến dịch CSV!");
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastText) {
      showToast("Vui lòng điền tiêu đề và nội dung thông báo!");
      return;
    }
    setIsBroadcastModalOpen(false);
    showToast(`Đã phát thông báo "${broadcastTitle}" tới 362 người dùng!`);
    setBroadcastTitle("");
    setBroadcastText("");
  };

  // Metrics summary for 1-month project lifecycle
  const metricCards: MetricCardData[] = [
    {
      title: "Tổng người dùng",
      value: "362",
      change: "100%",
      isPositive: true,
      subtext: "Hoàn thành mục tiêu qua 4 tuần",
      icon: <Users className="w-5 h-5 text-brand-purple" />,
      colorBg: "bg-purple-500/10 dark:bg-purple-500/20",
      colorBorder: "border-brand-purple",
      colorText: "text-brand-purple",
    },
    {
      title: "Người dùng HĐ (DAU)",
      value: "48",
      change: "13.3%",
      isPositive: true,
      subtext: "Trung bình 48 người hoạt động/ngày",
      icon: <Activity className="w-5 h-5 text-emerald-500" />,
      colorBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      colorBorder: "border-emerald-500",
      colorText: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Tổng lượt lật thẻ",
      value: "1,420",
      change: "100%",
      isPositive: true,
      subtext: "Trung bình 3.9 lượt lật/người",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      colorBg: "bg-amber-500/10 dark:bg-amber-500/20",
      colorBorder: "border-amber-500",
      colorText: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Thử thách hoàn thành",
      value: "3,856",
      change: "100%",
      isPositive: true,
      subtext: "Tổng 145,890 điểm tích lũy",
      icon: <Trophy className="w-5 h-5 text-brand-pink" />,
      colorBg: "bg-pink-500/10 dark:bg-pink-500/20",
      colorBorder: "border-brand-pink",
      colorText: "text-brand-pink",
    },
    {
      title: "Tỷ lệ rời bỏ (Churn Rate)",
      value: "14.2%",
      change: "-2.1%",
      isPositive: false,
      subtext: "51 người ngưng dùng sau tuần 1",
      icon: <LogOut className="w-5 h-5 text-red-500" />,
      colorBg: "bg-red-500/10 dark:bg-red-500/20",
      colorBorder: "border-red-500",
      colorText: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-4 md:p-8 font-cozy max-w-7xl mx-auto space-y-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-brand-card border-3 border-brand-outline shadow-pixel p-4 rounded-xl flex items-center gap-3 text-brand-text font-pixel"
          >
            <Sparkles className="w-5 h-5 text-brand-yellow animate-spin" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple border-2 border-brand-purple rounded-full text-xs font-pixel font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Báo Cáo Chiến Dịch 1 Tháng
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[11px] font-pixel font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> 01/06/2026 – 05/07/2026
            </span>
          </div>
          <h1 className="font-pixel text-2xl md:text-3xl font-extrabold text-brand-text tracking-tight flex items-center gap-2">
            Thống Kê Chiến Dịch 80others (1 Tháng)
          </h1>
          <p className="text-sm text-brand-text/70 font-medium">
            Tổng kết dữ liệu 4 tuần vận hành dự án từ đầu Tháng 6 đến đầu Tháng 7/2026
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time range selector (4 Weeks) */}
          <div className="flex bg-brand-bg border-2 border-brand-outline rounded-xl p-1 shadow-pixel-sm overflow-x-auto">
            {[
              { id: "w1", label: "Tuần 1" },
              { id: "w2", label: "Tuần 2" },
              { id: "w3", label: "Tuần 3" },
              { id: "w4", label: "Tuần 4" },
              { id: "all", label: "Cả 4 Tuần" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setTimeRange(r.id as any)}
                className={`px-2.5 py-1.5 text-xs font-pixel rounded-lg transition-all shrink-0 ${
                  timeRange === r.id
                    ? "bg-brand-purple text-white shadow-pixel-sm font-bold"
                    : "text-brand-text hover:bg-brand-border/40 font-medium"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="pixel-btn px-4 py-2 bg-brand-card text-brand-text rounded-xl font-pixel text-xs font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-brand-purple" />
            <span>Xuất CSV</span>
          </button>

          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="pixel-btn px-4 py-2 bg-brand-purple text-white rounded-xl font-pixel text-xs font-bold flex items-center gap-2 hover:bg-brand-purple-light transition-colors"
          >
            <BellRing className="w-4 h-4" />
            <span>Gửi Thông Báo</span>
          </button>
        </div>
      </div>

      {/* Top 5 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metricCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`bg-brand-card border-3 ${card.colorBorder} p-4 rounded-2xl shadow-pixel relative overflow-hidden group hover:-translate-y-1 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-pixel font-bold uppercase tracking-wider text-brand-text/70 truncate">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl border-2 ${card.colorBorder} ${card.colorBg} shrink-0`}>
                {card.icon}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <span className="font-pixel text-2xl font-extrabold text-brand-text tracking-tight">
                  {card.value}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center border ${
                    card.isPositive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20"
                  }`}
                >
                  {card.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-[11px] text-brand-text/65 font-medium leading-tight">{card.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 1: Page Views & Usage Ranking + Drop-off Content Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Visited & Used Pages */}
        <div className="bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-4">
          <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
            <div>
              <h2 className="font-pixel text-lg font-bold text-brand-text flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-brand-purple" />
                Trang Được Truy Cập & Sử Dụng Nhiều Nhất
              </h2>
              <p className="text-xs text-brand-text/70 font-medium">
                Thống kê lưu lượng truy cập và thời gian giữ chân trung bình của người dùng
              </p>
            </div>
            <span className="text-xs font-pixel font-bold px-2.5 py-1 bg-brand-purple/10 text-brand-purple rounded-lg border border-brand-purple/30">
              Tổng 1,420 Lượt View
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {pageUsageStats.map((page, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between font-pixel text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-brand-bg border border-brand-outline font-bold flex items-center justify-center text-[10px] text-brand-purple">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-brand-text">{page.name}</span>
                    <code className="text-[10px] text-brand-text/60 bg-brand-bg px-1.5 py-0.5 rounded border border-brand-border">
                      {page.path}
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-brand-purple">{page.views.toLocaleString()} view</span>
                    <span className="text-[11px] text-brand-text/60 font-semibold">{page.avgTime}/phiên</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-brand-bg border-2 border-brand-outline rounded-lg overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${page.percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full ${page.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop-Off Content & Drop Rate Analysis */}
        <div className="bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-4">
          <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
            <div>
              <h2 className="font-pixel text-lg font-bold text-brand-text flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Phân Tích Tỷ Lệ & Nội Dung Người Dùng Rời Bỏ
              </h2>
              <p className="text-xs text-brand-text/70 font-medium">
                Các điểm tương tác có tỷ lệ rời bỏ (drop-off) cao nhất và lý do ghi nhận
              </p>
            </div>
            <span className="text-xs font-pixel font-bold px-2.5 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg border border-red-500/30">
              51/362 Users Drop-off
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {dropOffStats.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-brand-bg border-2 border-brand-outline rounded-xl space-y-2 hover:border-brand-purple transition-all"
              >
                <div className="flex items-start justify-between gap-2 font-pixel">
                  <div>
                    <span className="text-xs font-bold text-brand-text block">{item.contentName}</span>
                    <span className="text-[10px] text-brand-text/60 font-semibold">{item.category}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-red-500 block">
                      Tỷ lệ rời bỏ: {item.dropRate}%
                    </span>
                    <span className="text-[10px] text-brand-text/60 font-semibold">
                      ({item.usersLost} người dừng)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-brand-border text-[11px] text-brand-text/80">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="italic font-medium">Nguyên nhân: {item.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Charts Section - User Growth & Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Area Chart (2 cols) */}
        <div className="lg:col-span-2 bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-brand-border pb-4">
            <div>
              <h2 className="font-pixel text-lg font-bold text-brand-text flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-purple" />
                Tăng Trưởng Người Dùng Qua 4 Tuần ({growthTimeline[0].label} – {growthTimeline[growthTimeline.length - 1].label})
              </h2>
              <p className="text-xs text-brand-text/70 font-medium">
                Số lượng người dùng tích lũy tăng liên tục đạt cột mốc <strong className="text-brand-purple">362 người dùng</strong> ở cuối chiến dịch
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-pixel">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-brand-purple inline-block" />
                <span>Tổng người dùng (362)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>Hoạt động (48 DAU)</span>
              </div>
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="h-64 w-full relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Lines */}
              {[0, 50, 100, 150].map((yVal, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={yVal}
                  x2="500"
                  y2={yVal}
                  stroke="var(--color-brand-border)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}

              {/* Area Path (Total Users) */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                d={`M 0,${200 - (growthTimeline[0].users / 400) * 180} ` +
                  growthTimeline
                    .map((d, i) => {
                      const x = (i / (growthTimeline.length - 1)) * 500;
                      const y = 200 - (d.users / 400) * 180;
                      return `L ${x},${y}`;
                    })
                    .join(" ") +
                  ` L 500,200 L 0,200 Z`}
                fill="url(#purpleGradient)"
              />

              {/* Line Path (Total Users) */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                d={`M 0,${200 - (growthTimeline[0].users / 400) * 180} ` +
                  growthTimeline
                    .map((d, i) => {
                      const x = (i / (growthTimeline.length - 1)) * 500;
                      const y = 200 - (d.users / 400) * 180;
                      return `L ${x},${y}`;
                    })
                    .join(" ")}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Line Path (Active Users) */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                d={`M 0,${200 - (growthTimeline[0].active / 400) * 180} ` +
                  growthTimeline
                    .map((d, i) => {
                      const x = (i / (growthTimeline.length - 1)) * 500;
                      const y = 200 - (d.active / 400) * 180;
                      return `L ${x},${y}`;
                    })
                    .join(" ")}
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />

              {/* Data Nodes */}
              {growthTimeline.map((d, i) => {
                const x = (i / (growthTimeline.length - 1)) * 500;
                const y = 200 - (d.users / 400) * 180;
                return (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#8B5CF6"
                      stroke="var(--color-brand-card)"
                      strokeWidth="2.5"
                      className="transition-transform group-hover:scale-150"
                    />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fill="var(--color-brand-text)"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="var(--font-pixel)"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {d.users} user
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between mt-2 pt-2 border-t border-brand-border px-1">
              {growthTimeline.map((item, idx) => (
                <span key={idx} className="font-pixel text-[11px] text-brand-text/70">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Device Breakdown Donut Chart (1 col) */}
        <div className="bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-5 flex flex-col justify-between">
          <div>
            <h2 className="font-pixel text-lg font-bold text-brand-text flex items-center gap-2 border-b-2 border-brand-border pb-3">
              <Smartphone className="w-5 h-5 text-brand-pink" />
              Nền Tảng Đăng Nhập
            </h2>
            <p className="text-xs text-brand-text/70 font-medium mt-1">
              Phân bổ ứng dụng di động PWA vs Trình duyệt Web
            </p>
          </div>

          {/* Donut representation */}
          <div className="flex items-center justify-center py-2">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-brand-border"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* PWA Mobile Arc (72%) */}
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "72, 100" }}
                  transition={{ duration: 1 }}
                  className="text-brand-purple"
                  strokeWidth="4.5"
                  strokeDasharray="72, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Desktop Arc (28%) */}
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "28, 100" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-brand-pink"
                  strokeWidth="4.5"
                  strokeDashoffset="-72"
                  strokeDasharray="28, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-pixel text-2xl font-black text-brand-text block">72%</span>
                <span className="text-[10px] font-pixel text-brand-text/75 font-semibold">Mobile PWA</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-brand-border font-pixel text-xs">
            <div className="flex items-center gap-2 p-2 bg-brand-bg rounded-xl border border-brand-outline">
              <Smartphone className="w-4 h-4 text-brand-purple" />
              <div>
                <span className="font-bold text-brand-text block">PWA Mobile</span>
                <span className="text-[11px] text-brand-text/70">260 (72%)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-brand-bg rounded-xl border border-brand-outline">
              <Monitor className="w-4 h-4 text-brand-pink" />
              <div>
                <span className="font-bold text-brand-text block">Desktop Web</span>
                <span className="text-[11px] text-brand-text/70">102 (28%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Peak Hours Activity Heatmap & Campaign Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peak Hours Heatmap (2 cols) */}
        <div className="lg:col-span-2 bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-4">
          <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
            <div>
              <h2 className="font-pixel text-lg font-bold text-brand-text flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Giờ Hoạt Động Cao Điểm (Mẫu Tương Tác 24h)
              </h2>
              <p className="text-xs text-brand-text/70 font-medium">
                Mật độ lật thẻ & thực hiện thử thách đạt đỉnh vào khung giờ <strong className="text-amber-600 dark:text-amber-400">20h - 22h mỗi tối</strong>
              </p>
            </div>
            <span className="text-xs font-pixel font-bold px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-500/30">
              Đỉnh: 110 lượt/h
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 pt-2">
            {hourlyActivity.map((item, idx) => {
              const intensity = item.val / 110;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div
                    style={{
                      backgroundColor: `rgba(139, 92, 246, ${Math.max(0.12, intensity)})`,
                      borderColor: intensity > 0.6 ? "#8B5CF6" : "var(--color-brand-border)",
                    }}
                    className="w-full h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-pixel-sm"
                  >
                    <span className="font-pixel text-xs font-bold text-brand-text">{item.val}</span>
                  </div>
                  <span className="font-pixel text-[10px] text-brand-text/70 font-semibold">{item.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campaign Summary Box (1 col) */}
        <div className="bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-4">
          <h2 className="font-pixel text-lg font-bold text-brand-text flex items-center gap-2 border-b-2 border-brand-border pb-3">
            <Sparkles className="w-5 h-5 text-brand-yellow" />
            Tổng Kết Chiến Dịch
          </h2>

          <div className="space-y-3 font-pixel text-xs">
            <div className="flex items-center justify-between p-3 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl text-emerald-700 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-bold">Trạng thái chiến dịch</span>
              </div>
              <span className="font-bold">Hoàn thành 100%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-500/10 border-2 border-purple-500/40 rounded-xl text-purple-700 dark:text-purple-300">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-pink fill-brand-pink" />
                <span className="font-bold">Lượt thả tim tích lũy</span>
              </div>
              <span className="font-bold">38,940 tim</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-500/10 border-2 border-amber-500/40 rounded-xl text-amber-700 dark:text-amber-300">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="font-bold">Huy hiệu đã mở</span>
              </div>
              <span className="font-bold">2,612 mở khóa</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Table Section */}
      <div className="bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-5">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-brand-border pb-4">
          <div>
            <h2 className="font-pixel text-xl font-bold text-brand-text flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-purple" />
              Danh Sách Người Dùng Đăng Ký Trong Chiến Dịch (362 Tài Khoản)
            </h2>
            <p className="text-xs text-brand-text/70 font-medium">
              Danh sách thành viên đăng ký từ 01/06/2026 đến 05/07/2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-brand-text/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên, email, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-brand-bg border-2 border-brand-outline rounded-xl text-xs font-pixel text-brand-text focus:outline-none focus:border-brand-purple shadow-pixel-sm w-48 sm:w-64"
              />
            </div>

            {/* Status Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-brand-bg border-2 border-brand-outline rounded-xl text-xs font-pixel text-brand-text focus:outline-none focus:border-brand-purple shadow-pixel-sm cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Ngoại tuyến">Ngoại tuyến</option>
              <option value="Tạm khóa">Tạm khóa</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-cozy text-xs">
            <thead>
              <tr className="border-b-2 border-brand-outline bg-brand-bg/60 font-pixel text-brand-text/80 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Mã User</th>
                <th className="py-3 px-4">Thành Viên</th>
                <th className="py-3 px-4">Loại Tài Khoản</th>
                <th className="py-3 px-4">Chuỗi Streak 🔥</th>
                <th className="py-3 px-4">Điểm Tích Lũy</th>
                <th className="py-3 px-4">Ngày Tham Gia</th>
                <th className="py-3 px-4">Trạng Thái</th>
                <th className="py-3 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-brand-border/30 transition-colors font-medium">
                    <td className="py-3 px-4 font-pixel font-bold text-brand-purple">{user.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1 bg-brand-bg border border-brand-outline rounded-lg shadow-pixel-sm">
                          {user.avatar}
                        </span>
                        <div>
                          <span className="font-bold text-brand-text block">{user.name}</span>
                          <span className="text-[11px] text-brand-text/65">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-pixel">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          user.role === "VIP"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/40"
                            : user.role === "Mới"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/40"
                            : "bg-purple-500/10 text-brand-purple border-brand-purple/40"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-pixel font-bold text-orange-500">{user.streak} ngày</td>
                    <td className="py-3 px-4 font-pixel font-bold text-brand-text">{user.points} pt</td>
                    <td className="py-3 px-4 text-brand-text/75">{user.joinedDate}</td>
                    <td className="py-3 px-4 font-pixel">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          user.status === "Hoạt động"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : user.status === "Tạm khóa"
                            ? "bg-red-500/15 text-red-600 dark:text-red-400"
                            : "bg-gray-500/15 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        ● {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => showToast(`Xem thông tin người dùng ${user.name}`)}
                          className="p-1.5 border border-brand-outline rounded-lg hover:bg-brand-bg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-3.5 h-3.5 text-brand-text" />
                        </button>
                        <button
                          onClick={() =>
                            showToast(
                              user.status === "Tạm khóa"
                                ? `Đã mở khóa cho ${user.name}`
                                : `Đã tạm khóa tài khoản ${user.name}`
                            )
                          }
                          className="p-1.5 border border-brand-outline rounded-lg hover:bg-brand-bg transition-colors"
                          title={user.status === "Tạm khóa" ? "Mở khóa" : "Khóa tài khoản"}
                        >
                          <UserX className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-brand-text/60 font-pixel">
                    Không tìm thấy người dùng phù hợp với từ khóa!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-brand-border font-pixel text-xs">
          <span className="text-brand-text/70">Hiển thị {filteredUsers.length} trên 362 người dùng</span>
          <div className="flex items-center gap-2">
            <button disabled className="p-1.5 border border-brand-outline rounded-lg opacity-50 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-brand-purple text-white rounded-lg font-bold shadow-pixel-sm">1</span>
            <button className="px-3 py-1 border border-brand-outline rounded-lg hover:bg-brand-bg">2</button>
            <button className="px-3 py-1 border border-brand-outline rounded-lg hover:bg-brand-bg">3</button>
            <span className="text-brand-text/50">...</span>
            <button className="px-3 py-1 border border-brand-outline rounded-lg hover:bg-brand-bg">45</button>
            <button className="p-1.5 border border-brand-outline rounded-lg hover:bg-brand-bg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast System Modal */}
      <AnimatePresence>
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-text/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel max-w-md w-full space-y-4"
            >
              <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
                <div className="flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-brand-purple" />
                  <h3 className="font-pixel text-lg font-bold text-brand-text">Gửi Thông Báo Toàn Hệ Thống</h3>
                </div>
                <button
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="p-1 border border-brand-outline rounded-lg hover:bg-brand-bg"
                >
                  <X className="w-4 h-4 text-brand-text" />
                </button>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-3 font-pixel text-xs">
                <div>
                  <label className="block font-bold text-brand-text mb-1">Tiêu đề thông báo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Cảm ơn bạn đã đồng hành trong chiến dịch! 🎉"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-bg border-2 border-brand-outline rounded-xl text-brand-text focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-text mb-1">Nội dung thông điệp</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Nhập thông điệp gửi tới 362 người dùng..."
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-bg border-2 border-brand-outline rounded-xl text-brand-text focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div className="p-3 bg-purple-500/10 border border-brand-purple/30 rounded-xl text-[11px] text-brand-purple flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Thông báo này sẽ được gửi tới tất cả 362 tài khoản thành viên.</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBroadcastModalOpen(false)}
                    className="px-4 py-2 border-2 border-brand-outline rounded-xl font-bold hover:bg-brand-bg"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="pixel-btn px-4 py-2 bg-brand-purple text-white rounded-xl font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Phát Thông Báo</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
