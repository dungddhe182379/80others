"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { triggerHeart } from "@/components/HeartRain";
import confetti from "canvas-confetti";
import { 
  Users, 
  Heart, 
  MessageSquare, 
  Image as ImageIcon,
  Send,
  Sparkles,
  Bookmark,
  Plus,
  ChevronRight
} from "lucide-react";

export default function CommunityPage() {
  const { moments, addMoment, likeMoment } = useApp();
  const [activeTab, setActiveTab] = useState<"moments" | "discussions">("moments");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPostingForm, setShowPostingForm] = useState(false);

  const handleLike = (id: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 3);
    likeMoment(id);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    // Call addMoment from context
    addMoment(newPostContent);
    
    // Clear form
    setNewPostContent("");
    setSelectedImage(null);
    setShowPostingForm(false);

    // Reward feedback
    confetti({
      particleCount: 50,
      spread: 50,
      colors: ["#F472B6", "#8B5CF6"],
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-6 relative">
      
      {/* 1. COMMUNITY HERO */}
      <section className="bg-brand-card border-3 border-brand-text p-6 rounded-3xl shadow-pixel relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-brand-pink/5 pointer-events-none" 
             style={{ clipPath: "circle(50px at right 40px)" }} />
        <h2 className="font-pixel text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
          🏡 Khoảnh khắc gia đình
        </h2>
        <p className="text-xs text-brand-text/75 font-semibold leading-relaxed">
          Chia sẻ những câu chuyện ấm áp, bức ảnh pixel đáng yêu và những trải nghiệm rút bài kết nối của gia đình bạn.
        </p>
      </section>

      {/* 2. TAB SWITCHER */}
      <div className="grid grid-cols-2 p-1 bg-brand-border/20 border-2 border-brand-text rounded-2xl">
        <button
          onClick={() => setActiveTab("moments")}
          className={`py-2 rounded-xl font-pixel font-bold text-xs transition-all cursor-pointer ${
            activeTab === "moments"
              ? "bg-brand-purple text-white border-2 border-brand-text shadow-pixel-sm"
              : "text-brand-text border-2 border-transparent"
          }`}
        >
          Khoảnh khắc
        </button>
        <button
          onClick={() => setActiveTab("discussions")}
          className={`py-2 rounded-xl font-pixel font-bold text-xs transition-all cursor-pointer ${
            activeTab === "discussions"
              ? "bg-brand-purple text-white border-2 border-brand-text shadow-pixel-sm"
              : "text-brand-text border-2 border-transparent"
          }`}
        >
          Thảo luận
        </button>
      </div>

      {/* 3. POSTING TRIGGER BUTTON & FORM */}
      {!showPostingForm ? (
        <button
          onClick={() => setShowPostingForm(true)}
          className="w-full py-4 border-3 border-dashed border-brand-text rounded-3xl bg-brand-card hover:bg-brand-bg/40 font-pixel font-bold text-sm text-brand-text/70 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-pixel-sm"
        >
          <Plus className="w-5 h-5" />
          Viết câu chuyện của gia đình bạn (+20 ❤️)
        </button>
      ) : (
        <form 
          onSubmit={handleCreatePost}
          className="bg-brand-card border-3 border-brand-text p-5 rounded-3xl shadow-pixel space-y-4 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-2">
            <span className="font-pixel text-xs font-bold text-brand-text">Đăng khoảnh khắc mới</span>
            <button 
              type="button"
              onClick={() => setShowPostingForm(false)}
              className="text-xs font-bold text-brand-text/50 hover:text-brand-text"
            >
              Hủy
            </button>
          </div>

          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Kể lại bữa tối vui vẻ của bạn, hay một câu trả lời làm cả nhà xúc động..."
            maxLength={300}
            className="w-full min-h-[90px] p-3 border-2 border-brand-border rounded-xl font-cozy text-xs text-brand-text bg-brand-bg/20 focus:outline-none focus:border-brand-text"
          />

          {/* Preset image attachment choice */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-brand-text/60 block">Đính kèm ảnh minh họa (Pixel Art):</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedImage(selectedImage === "/pixel_family_dinner.png" ? null : "/pixel_family_dinner.png")}
                className={`relative w-16 h-12 rounded-lg border-2 overflow-hidden shrink-0 transition-transform ${
                  selectedImage === "/pixel_family_dinner.png" ? "border-brand-purple scale-105" : "border-brand-border"
                }`}
              >
                <Image src="/pixel_family_dinner.png" alt="Bàn ăn" fill className="object-cover" sizes="64px" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedImage(selectedImage === "/pixel_cozy_fireplace.png" ? null : "/pixel_cozy_fireplace.png")}
                className={`relative w-16 h-12 rounded-lg border-2 overflow-hidden shrink-0 transition-transform ${
                  selectedImage === "/pixel_cozy_fireplace.png" ? "border-brand-purple scale-105" : "border-brand-border"
                }`}
              >
                <Image src="/pixel_cozy_fireplace.png" alt="Bếp lửa" fill className="object-cover" sizes="64px" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-brand-border pt-3">
            <span className="text-[10px] text-brand-text/50 font-semibold">Tối đa 300 ký tự</span>
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className={`py-2 px-5 font-pixel font-bold text-xs rounded-xl border-3 border-brand-text shadow-pixel flex items-center gap-1.5 cursor-pointer transition-all ${
                newPostContent.trim()
                  ? "bg-brand-purple text-white hover:shadow-pixel-hover hover:-translate-y-0.5"
                  : "bg-brand-bg text-brand-text/30 border-brand-border shadow-none pointer-events-none"
              }`}
            >
              <Send className="w-3.5 h-3.5" /> Chia sẻ
            </button>
          </div>
        </form>
      )}

      {/* 4. FEED */}
      {activeTab === "moments" ? (
        <div className="space-y-6">
          {moments.map((m) => (
            <article 
              key={m.id}
              className="bg-brand-card border-3 border-brand-text p-5 rounded-3xl shadow-pixel space-y-4"
            >
              {/* Header profile info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full border-2 border-brand-text overflow-hidden bg-brand-purple-light shadow-pixel-sm shrink-0">
                    <Image
                      src={m.author === "Tôi & Gia đình" ? "/pixel_avatar.png" : "/pixel_avatar.png"}
                      alt={m.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-brand-text block">{m.author}</h4>
                    <span className="text-[9px] text-brand-text/50 font-semibold block">{m.time}</span>
                  </div>
                </div>
                
                {/* Save icon */}
                <button className="text-brand-text/40 hover:text-brand-purple p-1">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Text content */}
              <p className="font-cozy font-medium text-xs md:text-sm text-brand-text leading-relaxed">
                {m.content}
              </p>

              {/* Photo attachment */}
              {m.photoUrl && (
                <div className="relative h-48 sm:h-60 w-full rounded-2xl border-3 border-brand-text overflow-hidden shadow-pixel-sm bg-brand-bg">
                  <Image
                    src={m.photoUrl}
                    alt="Bức ảnh khoảnh khắc gia đình"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              )}

              {/* Actions interact bar */}
              <div className="flex items-center justify-between border-t-2 border-brand-border/40 pt-3">
                <div className="flex gap-6">
                  {/* Like */}
                  <button
                    onClick={(e) => handleLike(m.id, e)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                      m.likedByUser ? "text-brand-pink" : "text-brand-text/70"
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${m.likedByUser ? "fill-brand-pink text-brand-pink" : ""}`} />
                    <span>{m.likes}</span>
                  </button>

                  {/* Comment */}
                  <button className="flex items-center gap-1.5 text-xs font-bold text-brand-text/70 hover:text-brand-purple">
                    <MessageSquare className="w-4 h-4" />
                    <span>{m.comments}</span>
                  </button>
                </div>
                
                <span className="text-[9px] font-pixel text-brand-purple-light font-bold bg-brand-bg px-2 py-0.5 rounded">
                  FAMILY MOMENT
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Discussions view */
        <div className="space-y-4">
          {[
            {
              title: "Làm thế nào để thuyết phục ông bà cùng rút thẻ chơi?",
              replies: 12,
              views: 48,
              author: "Quỳnh Anh"
            },
            {
              title: "Cách xử lý khi rút trúng câu hỏi quá xúc động?",
              replies: 8,
              views: 32,
              author: "Hoàng Nam"
            },
            {
              title: "Gợi ý chọn bộ bài cho con từ 6-10 tuổi",
              replies: 15,
              views: 94,
              author: "Bố Sơn"
            }
          ].map((topic, i) => (
            <div 
              key={i} 
              className="bg-brand-card border-3 border-brand-text p-4 rounded-3xl shadow-pixel hover:bg-brand-bg/20 transition-colors cursor-pointer flex justify-between items-center"
            >
              <div className="space-y-1">
                <h4 className="font-cozy font-bold text-xs text-brand-text hover:underline leading-snug">
                  💬 {topic.title}
                </h4>
                <p className="text-[10px] text-brand-text/60 font-semibold">
                  Đăng bởi {topic.author} • {topic.replies} phản hồi • {topic.views} lượt xem
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-brand-text/40 shrink-0" />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
