"use client";

import React, { useState } from "react";
import { useApp, Challenge } from "@/context/AppContext";
import { triggerHeart } from "@/components/HeartRain";
import confetti from "canvas-confetti";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  CheckCircle,
  HelpCircle,
  Flame,
  Award
} from "lucide-react";

export default function ChallengesPage() {
  const { challenges, completeChallenge, points } = useApp();
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");

  const handleComplete = (id: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 5);

    confetti({
      particleCount: 80,
      spread: 60,
      colors: ["#8B5CF6", "#F472B6", "#FBBF24"],
      origin: { y: 0.7 }
    });

    completeChallenge(id);
  };

  const filteredChallenges = challenges.filter(c => c.type === activeTab);

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-6">
      
      {/* 1. CHALLENGE HERO */}
      <section className="bg-brand-card border-3 border-brand-text p-6 rounded-3xl shadow-pixel text-center space-y-3 relative overflow-hidden">
        {/* Background sparkles */}
        <div className="absolute top-2 right-4 text-xl animate-bounce">✨</div>
        <div className="absolute bottom-4 left-6 text-lg animate-bounce" style={{ animationDelay: '1s' }}>💖</div>
        
        <div className="w-16 h-16 rounded-full border-3 border-brand-text bg-brand-yellow flex items-center justify-center mx-auto shadow-pixel-sm">
          <Trophy className="w-8 h-8 text-brand-text" />
        </div>
        <div className="space-y-1">
          <h2 className="font-pixel text-2xl font-bold text-brand-text">
            Thử thách gắn kết
          </h2>
          <p className="text-xs text-brand-text/75 font-semibold">
            Hoàn thành các thử thách nhỏ cùng gia đình để nhận thêm điểm kết nối.
          </p>
        </div>
      </section>

      {/* 2. TAB SWITCHER */}
      <div className="grid grid-cols-2 p-1.5 bg-brand-border/30 border-3 border-brand-text rounded-2xl">
        <button
          onClick={() => setActiveTab("daily")}
          className={`py-2.5 rounded-xl font-pixel font-bold text-sm transition-all cursor-pointer ${
            activeTab === "daily"
              ? "bg-brand-purple text-white border-2 border-brand-text shadow-pixel-sm"
              : "text-brand-text hover:bg-brand-card/50 border-2 border-transparent"
          }`}
        >
          Hôm nay
        </button>
        <button
          onClick={() => setActiveTab("weekly")}
          className={`py-2.5 rounded-xl font-pixel font-bold text-sm transition-all cursor-pointer ${
            activeTab === "weekly"
              ? "bg-brand-purple text-white border-2 border-brand-text shadow-pixel-sm"
              : "text-brand-text hover:bg-brand-card/50 border-2 border-transparent"
          }`}
        >
          Thử thách tuần
        </button>
      </div>

      {/* 3. CHALLENGES LIST */}
      <div className="space-y-4">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((ch) => {
            const progressPercent = (ch.progress / ch.maxProgress) * 100;
            return (
              <div
                key={ch.id}
                className="bg-brand-card border-3 border-brand-text p-5 rounded-3xl shadow-pixel flex flex-col justify-between gap-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="font-cozy font-bold text-sm sm:text-base text-brand-text leading-tight">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-brand-text/70 font-semibold leading-relaxed">
                      {ch.description}
                    </p>
                  </div>
                  
                  {/* Reward Badge */}
                  <span className="shrink-0 font-pixel text-[10px] font-bold text-brand-pink border-2 border-brand-pink bg-pink-50/50 px-2 py-0.5 rounded-lg flex items-center gap-1 select-none">
                    ❤️ +{ch.points}
                  </span>
                </div>

                {/* Progress section */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-brand-text/50">Tiến trình</span>
                    <span>{ch.progress} / {ch.maxProgress}</span>
                  </div>
                  <div className="h-3.5 bg-brand-bg border-2 border-brand-text rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div
                      className="h-full bg-brand-purple-light rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Check action button */}
                {ch.completed ? (
                  <div className="w-full py-2.5 bg-green-50 text-green-700 font-bold border-2 border-green-500 rounded-2xl flex items-center justify-center gap-1.5 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-600 fill-green-100" />
                    Đã hoàn thành!
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleComplete(ch.id, e)}
                    disabled={ch.type === "weekly"} // Weekly challenges update automatically by playing cards/sharing posts
                    className={`w-full py-2.5 rounded-2xl border-3 border-brand-text font-pixel font-bold text-xs shadow-pixel hover:shadow-pixel-hover active:translate-y-0 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      ch.type === "weekly"
                        ? "bg-brand-bg text-brand-text/40 border-brand-border pointer-events-none shadow-none hover:translate-y-0"
                        : "bg-brand-purple-light/20 text-brand-text hover:bg-brand-purple-light/40"
                    }`}
                  >
                    {ch.type === "weekly" ? (
                      <>
                        <Clock className="w-4 h-4" />
                        Tự động hoàn thành theo tiến trình
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4.5 h-4.5" />
                        Đánh dấu hoàn thành
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-brand-card border-3 border-brand-text p-8 rounded-3xl shadow-pixel text-center text-brand-text/50 text-xs font-semibold">
            Không tìm thấy thử thách nào.
          </div>
        )}
      </div>

    </div>
  );
}
