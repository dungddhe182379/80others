"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Layers,
  Send,
  Star,
  Sparkles,
  Heart,
  CheckCircle2,
  ThumbsUp,
  Bug,
  Lightbulb,
  Palette,
  MessageCircle,
  HelpCircle,
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from "lucide-react";

interface FeedbackItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  likes: number;
}

// 30 Authentic Vietnamese Feedbacks on Online Card Deck
const mockCardDeckFeedback: FeedbackItem[] = [
  { id: "fb-1", name: "Minh Anh", avatar: "🌸", rating: 5, category: "Nội dung câu hỏi", comment: "Giao diện Pixel lật bài 3D siêu mê! Câu hỏi lá bài 'Điều gì khiến bạn biết ơn gia đình nhất' làm cả nhà mình rớm nước mắt tối qua.", date: "Hôm nay, 10:15", likes: 24 },
  { id: "fb-2", name: "Hoàng Long", avatar: "🎮", rating: 5, category: "Hiệu ứng lật thẻ 3D", comment: "Lật bài rất mượt trên điện thoại. Giá như có thêm chế độ lật bài đôi cho 2 người chơi trên cùng 1 máy thì tuyệt vời hơn nữa!", date: "Hôm nay, 08:30", likes: 18 },
  { id: "fb-3", name: "Phương Thảo", avatar: "☕", rating: 5, category: "Nội dung câu hỏi", comment: "Các câu hỏi trong bộ bài 'Gia Đình Ấm Áp' chạm tới cảm xúc thật sự. Tối nào ăn cơm xong cả nhà cũng mở app lật 1 lá bài.", date: "Hôm qua, 21:40", likes: 31 },
  { id: "fb-4", name: "Đức Trí", avatar: "💻", rating: 5, category: "Hiệu ứng lật thẻ 3D", comment: "Ứng dụng nhẹ, hiệu ứng âm thanh lật bài nghe rất chill. Mình đã giới thiệu cho cả nhóm bạn thân cùng lật bài mỗi tối.", date: "Hôm qua, 19:12", likes: 15 },
  { id: "fb-5", name: "Bảo Ngọc", avatar: "🎨", rating: 5, category: "Đề xuất bộ bài mới", comment: "Thẻ bài thiết kế phong cách Pixel dễ thương xỉu! Mong nhóm làm thêm bộ bài chủ đề 'Kỷ Niệm Tuổi Thơ' thế hệ 8x 9x.", date: "21/07/2026", likes: 27 },
  { id: "fb-6", name: "Hải Đăng", avatar: "🚴‍♂️", rating: 5, category: "Nội dung câu hỏi", comment: "Nội dung câu hỏi bộ bài vừa sâu sắc vừa hóm hỉnh. Lần đầu thấy có app lật bài online bài bản cho người Việt thế này.", date: "21/07/2026", likes: 19 },
  { id: "fb-7", name: "Thùy Dương", avatar: "🎧", rating: 5, category: "Nội dung câu hỏi", comment: "Rất thích nhạc nền nhẹ nhàng lúc lật bài. Bộ bài 'Tình Yêu & Thấu Hiểu' hỏi đúng mấy câu hai đứa mình đang vướng mắc.", date: "20/07/2026", likes: 22 },
  { id: "fb-8", name: "Quốc Anh", avatar: "👨‍🌾", rating: 5, category: "Nội dung câu hỏi", comment: "Cứ tưởng app lật bài bình thường ai ngờ hỏi trúng phóc mấy tâm tư của ông bà bố mẹ. 10/10 điểm cho sự tinh tế!", date: "20/07/2026", likes: 14 },
  { id: "fb-9", name: "Ngọc Ánh", avatar: "🐱", rating: 5, category: "Trải nghiệm chung", comment: "Mấy câu hỏi trong bộ bài bốc ngẫu nhiên rất tự nhiên, không bị gượng ép. Mình với đám bạn thân ngồi cà phê lật suốt 2 tiếng.", date: "19/07/2026", likes: 35 },
  { id: "fb-10", name: "Tuấn Kiệt", avatar: "⚽", rating: 4, category: "Đề xuất bộ bài mới", comment: "Giao diện mượt, lật bài 3D rải hoa tuyết đẹp mắt. Mong app bổ sung tính năng lưu lại những câu trả lời hay của các thành viên.", date: "19/07/2026", likes: 11 },
  { id: "fb-11", name: "Thúy Hằng", avatar: "🌷", rating: 5, category: "Nội dung câu hỏi", comment: "Bộ bài 'Kết Nối Thế Hệ' giúp mình hiểu bố mẹ hơn rất nhiều. Cảm ơn team 80others vì ứng dụng ý nghĩa này!", date: "18/07/2026", likes: 29 },
  { id: "fb-12", name: "Anh Khoa", avatar: "📷", rating: 4, category: "Hiệu ứng lật thẻ 3D", comment: "Mong app có tính năng chụp hình kèm câu hỏi trên lá bài để đăng story Facebook/Instagram cho đẹp!", date: "18/07/2026", likes: 16 },
  { id: "fb-13", name: "Khánh Linh", avatar: "🍓", rating: 5, category: "Nội dung câu hỏi", comment: "Thẻ bài có hình minh họa Pixel dễ thương dã dũng! Mẹ mình 50 tuổi rồi mà tối nào cũng đòi lật bài với con gái.", date: "17/07/2026", likes: 42 },
  { id: "fb-14", name: "Nhật Minh", avatar: "🚀", rating: 5, category: "Trải nghiệm chung", comment: "Thích nhất là không có quảng cáo rác làm gián đoạn trải nghiệm lật bài. Hy vọng giữ vững phong độ này!", date: "17/07/2026", likes: 20 },
  { id: "fb-15", name: "Thanh Trúc", avatar: "📖", rating: 5, category: "Nội dung câu hỏi", comment: "Câu hỏi 'Nếu có 1 ngày quay lại quá khứ, bạn muốn nhắn gì với chính mình?' làm mình suy ngẫm rất nhiều.", date: "16/07/2026", likes: 25 },
  { id: "fb-16", name: "Gia Huy", avatar: "🎸", rating: 5, category: "Đề xuất bộ bài mới", comment: "Rất mê animation lật mặt sau lá bài. Đề xuất thêm bộ bài về chủ đề 'Đồng Nghiệp & Công Việc' chill chill.", date: "16/07/2026", likes: 13 },
  { id: "fb-17", name: "Hà My", avatar: "🌈", rating: 5, category: "Trải nghiệm chung", comment: "Ứng dụng mang lại năng lượng tích cực cho những ngày căng thẳng. Lật 1 lá bài thấy lòng nhẹ nhàng hẳn.", date: "15/07/2026", likes: 30 },
  { id: "fb-18", name: "Việt Hoàng", avatar: "🏃‍♂️", rating: 5, category: "Hiệu ứng lật thẻ 3D", comment: "Lật bài mượt trên Android, không bị giật lag. Đánh giá 5 sao động viên team phát triển!", date: "15/07/2026", likes: 9 },
  { id: "fb-19", name: "Mai Chi", avatar: "🍰", rating: 5, category: "Nội dung câu hỏi", comment: "Mấy câu hỏi về chủ đề 'Góc Nhìn Khác Biệt' mở ra nhiều góc nhìn thú vị khi thảo luận nhóm bạn thân.", date: "14/07/2026", likes: 17 },
  { id: "fb-20", name: "Tấn Phát", avatar: "🛠️", rating: 5, category: "Trải nghiệm chung", comment: "Tính năng thông báo nhắc nhở lật bài mỗi tối 8h rất đúng giờ. Cả nhà tập được thói quen quây quần cùng nhau.", date: "14/07/2026", likes: 21 },
  { id: "fb-21", name: "Tuyết Nhi", avatar: "❄️", rating: 5, category: "Hiệu ứng lật thẻ 3D", comment: "Tone màu pastel kết hợp font chữ retro pixel nhìn cưng xỉu. Rất mong chờ các bộ bài cập nhật vào lễ Tết.", date: "13/07/2026", likes: 26 },
  { id: "fb-22", name: "Đăng Khoa", avatar: "🍔", rating: 5, category: "Nội dung câu hỏi", comment: "Thử thách lật bài gia đình tuần vừa rồi làm cả nhà mình cười đau cả bụng. Trải nghiệm rất đáng tiền!", date: "13/07/2026", likes: 14 },
  { id: "fb-23", name: "Phương Anh", avatar: "🌻", rating: 5, category: "Nội dung câu hỏi", comment: "Các bộ câu hỏi được biên soạn rất tinh tế, không chạm vào những chủ đề nhạy cảm hay gây bất hòa.", date: "12/07/2026", likes: 33 },
  { id: "fb-24", name: "Thành Trung", avatar: "♟️", rating: 5, category: "Trải nghiệm chung", comment: "App dùng rất cuốn, mình hay dùng để phá băng (ice-break) trong các buổi offline câu lạc bộ học thuật.", date: "12/07/2026", likes: 19 },
  { id: "fb-25", name: "Yến Nhi", avatar: "🍦", rating: 5, category: "Hiệu ứng lật thẻ 3D", comment: "Thích mê chế độ giao diện tối (Dark Mode)! Lật bài buổi tối trước khi đi ngủ không lo bị chói mắt.", date: "11/07/2026", likes: 28 },
  { id: "fb-26", name: "Đức Anh", avatar: "🎧", rating: 5, category: "Đề xuất bộ bài mới", comment: "Hy vọng team có thêm phiên bản bộ bài in giấy cứng để mua làm quà tặng bạn bè nhân dịp sinh nhật.", date: "11/07/2026", likes: 37 },
  { id: "fb-27", name: "Hồng Hạnh", avatar: "🌺", rating: 5, category: "Nội dung câu hỏi", comment: "Những lá bài mang thông điệp chữa lành rất chạm. Cảm thấy như có một người bạn thấu hiểu bên cạnh.", date: "10/07/2026", likes: 23 },
  { id: "fb-28", name: "Trọng Nghĩa", avatar: "🎒", rating: 4, category: "Đề xuất bộ bài mới", comment: "Mong app cho phép tự tạo thêm lá bài với câu hỏi cá nhân hóa dành riêng cho gia đình mình.", date: "10/07/2026", likes: 16 },
  { id: "fb-29", name: "Thanh Thảo", avatar: "🌱", rating: 5, category: "Nội dung câu hỏi", comment: "Mỗi lá bài rút ra là một bất ngờ nhỏ. Trẻ con trong nhà thích mê việc giành nhau bấm nút lật bài.", date: "09/07/2026", likes: 20 },
  { id: "fb-30", name: "Quang Huy", avatar: "⭐", rating: 5, category: "Trải nghiệm chung", comment: "10/10 cho ý tưởng kết nối thế hệ qua bộ bài online. Chúc 80others ngày càng phát triển rực rỡ!", date: "09/07/2026", likes: 45 },
];

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<string>("Nội dung câu hỏi");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState<number>(6); // Show 6 initially, expandable to 30

  const categories = [
    { id: "Nội dung câu hỏi", label: "Nội dung & Câu hỏi thẻ bài", icon: <BookOpen className="w-4 h-4 text-brand-purple" /> },
    { id: "Hiệu ứng lật thẻ 3D", label: "Trải nghiệm & Hiệu ứng lật thẻ 3D", icon: <Palette className="w-4 h-4 text-brand-pink" /> },
    { id: "Đề xuất bộ bài mới", label: "Đề xuất Chủ đề Bộ bài mới", icon: <Lightbulb className="w-4 h-4 text-amber-500" /> },
    { id: "Báo lỗi hiển thị", label: "Báo lỗi hiển thị / Âm thanh", icon: <Bug className="w-4 h-4 text-red-500" /> },
    { id: "Trải nghiệm chung", label: "Cảm nhận chung", icon: <HelpCircle className="w-4 h-4 text-blue-500" /> },
  ];

  const ratingEmojis = [
    { score: 1, label: "Rất chưa tốt", emoji: "😡" },
    { score: 2, label: "Cần cải thiện", emoji: "🙁" },
    { score: 3, label: "Bình thường", emoji: "😐" },
    { score: 4, label: "Hài lòng", emoji: "😊" },
    { score: 5, label: "Rất thích", emoji: "🥰" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsSubmitted(true);
  };

  const handleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setContent("");
    setRating(5);
  };

  const toggleShowMore = () => {
    if (visibleCount < mockCardDeckFeedback.length) {
      setVisibleCount(mockCardDeckFeedback.length); // Expand all 30
    } else {
      setVisibleCount(6); // Collapse to 6
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text p-4 md:p-8 font-cozy max-w-5xl mx-auto space-y-8">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b-2 border-brand-border pb-4">
        <Link
          href="/cards"
          className="flex items-center gap-2 font-pixel text-xs font-bold text-brand-text/75 hover:text-brand-purple transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Bộ Bài Online</span>
        </Link>
        <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple border-2 border-brand-purple rounded-full text-xs font-pixel font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Góp Ý Bộ Bài Online (30 Cảm Nhận)
        </span>
      </div>

      {/* Main Banner */}
      <div className="bg-brand-card border-3 border-brand-outline p-6 md:p-8 rounded-2xl shadow-pixel relative overflow-hidden text-center space-y-3">
        <div className="w-16 h-16 bg-brand-purple/10 border-2 border-brand-purple rounded-2xl flex items-center justify-center mx-auto shadow-pixel-sm">
          <Layers className="w-8 h-8 text-brand-purple" />
        </div>
        <h1 className="font-pixel text-2xl md:text-3xl font-extrabold text-brand-text tracking-tight">
          Đánh Giá & Phản Hồi Bộ Bài Online 80others
        </h1>
        <p className="text-sm text-brand-text/75 max-w-xl mx-auto font-medium">
          Hãy chia sẻ cảm nhận của bạn khi lật thẻ, các câu hỏi trên từng lá bài và ý tưởng chủ đề bộ bài online tiếp theo mà bạn muốn trải nghiệm!
        </p>
      </div>

      {/* Main Feedback Form Card */}
      <div className="bg-brand-card border-3 border-brand-outline p-6 md:p-8 rounded-2xl shadow-pixel space-y-6">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Rating Scale */}
              <div className="space-y-3 text-center">
                <label className="block font-pixel text-sm font-bold text-brand-text">
                  Bạn đánh giá trải nghiệm lật Bộ Bài Online thế nào?
                </label>
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  {ratingEmojis.map((item) => (
                    <button
                      key={item.score}
                      type="button"
                      onClick={() => setRating(item.score)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        rating === item.score
                          ? "bg-brand-purple/10 border-brand-purple shadow-pixel-sm scale-110"
                          : "bg-brand-bg border-brand-outline opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="font-pixel text-[11px] font-bold text-brand-text">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selector */}
              <div className="space-y-2">
                <label className="block font-pixel text-xs font-bold text-brand-text uppercase tracking-wider">
                  Chủ đề bạn muốn góp ý về Bộ Bài Online
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 font-pixel text-xs transition-all cursor-pointer ${
                        category === cat.id
                          ? "bg-brand-purple text-white border-brand-outline shadow-pixel-sm font-bold"
                          : "bg-brand-bg text-brand-text border-brand-outline hover:bg-brand-border/40 font-medium"
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* User Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pixel text-xs font-bold text-brand-text mb-1">
                    Tên của bạn (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Bạn đồng hành lật thẻ..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-brand-bg border-2 border-brand-outline rounded-xl font-pixel text-xs text-brand-text focus:outline-none focus:border-brand-purple shadow-pixel-sm"
                  />
                </div>

                <div>
                  <label className="block font-pixel text-xs font-bold text-brand-text mb-1">
                    Email nhận phản hồi (Tùy chọn)
                  </label>
                  <input
                    type="email"
                    placeholder="ban.dong.hanh@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-brand-bg border-2 border-brand-outline rounded-xl font-pixel text-xs text-brand-text focus:outline-none focus:border-brand-purple shadow-pixel-sm"
                  />
                </div>
              </div>

              {/* Feedback Content Textarea */}
              <div className="space-y-1.5">
                <label className="block font-pixel text-xs font-bold text-brand-text">
                  Chi tiết góp ý hoặc ý tưởng lá bài mới <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Chia sẻ suy nghĩ của bạn về câu hỏi thẻ bài, hiệu ứng lật thẻ 3D hoặc chủ đề bộ bài mới mà bạn muốn team 80others ra mắt..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-bg border-2 border-brand-outline rounded-xl font-cozy text-xs text-brand-text focus:outline-none focus:border-brand-purple shadow-pixel-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="pixel-btn px-6 py-3 bg-brand-purple text-white rounded-xl font-pixel text-sm font-bold flex items-center gap-2 hover:bg-brand-purple-light transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Góp Ý Bộ Bài</span>
                </button>
              </div>
            </motion.form>
          ) : (
            /* Success Thank You Card */
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center py-8 space-y-4 font-pixel"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-brand-text">Cảm Ơn Đóng Góp Về Bộ Bài Online! 🎴</h2>
              <p className="text-xs text-brand-text/70 max-w-md mx-auto font-cozy font-medium">
                Ý kiến của bạn giúp team 80others sáng tạo thêm nhiều bộ bài ấm áp và tối ưu trải nghiệm lật thẻ tuyệt vời hơn.
              </p>
              <div className="pt-2">
                <button
                  onClick={resetForm}
                  className="pixel-btn px-5 py-2.5 bg-brand-card border-2 border-brand-outline rounded-xl text-xs font-bold text-brand-text hover:bg-brand-bg transition-colors"
                >
                  Gửi Phản Hồi Khác
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Community Card Deck Feedback Feed (30 Items with Expand Button) */}
      <div className="bg-brand-card border-3 border-brand-outline p-6 rounded-2xl shadow-pixel space-y-5 font-cozy">
        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-pink fill-brand-pink" />
            <h2 className="font-pixel text-lg font-bold text-brand-text">
              Cảm Nhận Từ Người Dùng (30 Góp Ý)
            </h2>
          </div>
          <span className="text-xs font-pixel text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full border border-brand-purple/30 font-bold">
            Hiển thị {Math.min(visibleCount, mockCardDeckFeedback.length)} / {mockCardDeckFeedback.length}
          </span>
        </div>

        {/* Grid of Feedbacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCardDeckFeedback.slice(0, visibleCount).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-bg border-2 border-brand-outline p-4 rounded-xl space-y-3 flex flex-col justify-between hover:border-brand-purple transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl p-1 bg-brand-card border border-brand-outline rounded-lg shadow-pixel-sm">
                      {item.avatar}
                    </span>
                    <div>
                      <span className="font-pixel text-xs font-bold text-brand-text block">{item.name}</span>
                      <span className="text-[10px] text-brand-text/60 font-semibold">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="font-pixel font-bold ml-1">{item.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-text/85 font-medium leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-brand-border text-[11px] font-pixel">
                <span className="px-2 py-0.5 bg-brand-purple/10 text-brand-purple rounded-md font-bold truncate max-w-[150px]">
                  {item.category}
                </span>
                <button
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                    likedPosts[item.id]
                      ? "bg-brand-pink/20 border-brand-pink text-brand-pink font-bold"
                      : "bg-brand-card border-brand-outline text-brand-text/70 hover:bg-brand-border/40"
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{item.likes + (likedPosts[item.id] ? 1 : 0)}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        <div className="pt-3 text-center">
          <button
            onClick={toggleShowMore}
            className="pixel-btn px-6 py-2.5 bg-brand-card border-2 border-brand-outline rounded-xl font-pixel text-xs font-bold text-brand-text hover:bg-brand-purple hover:text-white transition-all inline-flex items-center gap-2 cursor-pointer shadow-pixel-sm"
          >
            {visibleCount < mockCardDeckFeedback.length ? (
              <>
                <span>Xem thêm {mockCardDeckFeedback.length - visibleCount} góp ý khác</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </>
            ) : (
              <>
                <span>Thu gọn danh sách</span>
                <ChevronUp className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
