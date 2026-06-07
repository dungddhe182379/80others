"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp, Challenge, Moment } from "@/context/AppContext";
import { triggerHeart } from "@/components/HeartRain";
import confetti from "canvas-confetti";
import {
  Flame,
  Heart,
  RotateCw,
  CheckCircle2,
  ChevronRight,
  Smile,
  Compass,
  Sparkles,
  MessageSquare,
  Gift
} from "lucide-react";

const CARD_POOL = [
  {
    id: "h1",
    deck: "HEART",
    deckTitle: "HEART CARD - Yêu thương",
    question: "Điều gì bạn muốn cảm ơn bố mẹ nhưng chưa từng nói?",
    listenTip: "Lắng nghe bằng sự tôn trọng và yêu thương",
    color: "bg-pink-100 text-brand-pink border-brand-pink",
    borderColor: "border-brand-pink",
    bgLight: "bg-pink-50",
    emoji: "💌"
  },
  {
    id: "w1",
    deck: "WARM",
    deckTitle: "WARM CARD - Khởi động",
    question: "Điều gì về gia đình khiến bạn cảm thấy tự hào nhất?",
    listenTip: "Hãy bắt đầu bằng những chia sẻ chân thành nhất",
    color: "bg-amber-100 text-amber-700 border-amber-500",
    borderColor: "border-amber-500",
    bgLight: "bg-amber-50",
    emoji: "☕"
  },
  {
    id: "p1",
    deck: "PLAY",
    deckTitle: "PLAY CARD - Tương tác",
    question: "Oẳn tù tì với người bên cạnh, người thua phải làm một trò hề cho cả nhà.",
    listenTip: "Hãy cùng cười đùa và tạo không khí vui tươi",
    color: "bg-blue-100 text-blue-700 border-blue-500",
    borderColor: "border-blue-500",
    bgLight: "bg-blue-50",
    emoji: "🎲"
  },
  {
    id: "b1",
    deck: "BOND",
    deckTitle: "BOND CARD - Thấu hiểu",
    question: "Kỷ niệm vui vẻ nhất của bạn với gia đình trong năm vừa qua là gì?",
    listenTip: "Lắng nghe ký ức và cùng nhau trân trọng",
    color: "bg-purple-100 text-brand-purple border-brand-purple-light",
    borderColor: "border-brand-purple-light",
    bgLight: "bg-brand-bg",
    emoji: "📸"
  },
  {
    id: "s1",
    deck: "SAFE",
    deckTitle: "SAFE CARD - Quyền im lặng",
    question: "Quyền im lặng: Bạn có thể bỏ qua câu hỏi này hoặc yêu cầu một thành viên khác trả lời.",
    listenTip: "Tôn trọng không gian riêng tư của mỗi người",
    color: "bg-slate-100 text-slate-700 border-slate-500",
    borderColor: "border-slate-500",
    bgLight: "bg-slate-50",
    emoji: "🛡️"
  }
];

const MOOD_IMAGES: Record<string, string> = {
  "😍": "/assets/moods/love.png?v=2",
  "🙂": "/assets/moods/nice.png?v=2",
  "😐": "/assets/moods/okay.png?v=2",
  "😔": "/assets/moods/sad.png?v=2"
};

export default function HomePage() {
  const {
    points,
    streak,
    mood,
    setMood,
    challenges,
    completeChallenge,
    moments,
    likeMoment,
    addCompletedCard,
    completedCardIds
  } = useApp();

  const [greeting, setGreeting] = useState("Chào buổi tối! 🌙");
  const [currentCard, setCurrentCard] = useState(CARD_POOL[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [drawCount, setDrawCount] = useState(0);

  // Determine greeting based on current local time
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting("Chào buổi sáng! ☀️");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Chào buổi chiều! 🌤️");
    } else {
      setGreeting("Chào buổi tối! 🌙");
    }
  }, []);

  const handleDrawCard = (e: React.MouseEvent) => {
    // Spawn hearts at button coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 3);

    setIsFlipped(true);

    // Select a random card distinct from current
    const index = Math.floor(Math.random() * CARD_POOL.length);
    const selected = CARD_POOL[index];

    // Trigger confetti on drawing a new card for additional reward feedback
    setTimeout(() => {
      setCurrentCard(selected);
      setIsFlipped(false);
      addCompletedCard(selected.id);
      confetti({
        particleCount: 30,
        spread: 40,
        colors: ["#8B5CF6", "#F472B6", "#FBBF24"],
        origin: { y: 0.8 }
      });
    }, 300);

    setDrawCount(prev => prev + 1);
  };

  const handleCompleteChallenge = (id: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Burst of hearts!
    triggerHeart(rect.left + rect.width / 2, rect.top, 5);

    // Confetti effect!
    confetti({
      particleCount: 80,
      spread: 60,
      colors: ["#FBBF24", "#F472B6", "#8B5CF6"],
      origin: { y: 0.7 }
    });

    completeChallenge(id);
  };

  const handleMoodSelect = (selectedMood: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 4);
    setMood(selectedMood);
  };

  // Get daily challenges
  const dailyChallenges = challenges.filter(c => c.type === "daily");
  // Today's main challenge (first incomplete or just the first one)
  const todayChallenge = dailyChallenges.find(c => !c.completed) || dailyChallenges[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">

      {/* 1. WELCOME BANNER */}
      <section className="bg-brand-card border-3 border-brand-outline p-6 rounded-3xl shadow-pixel relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 flex-grow">
          <h2 className="font-pixel text-2xl md:text-3xl font-bold text-brand-text flex items-center gap-2">
            {greeting}
          </h2>
          <p className="text-brand-text/80 text-xs md:text-sm font-semibold">
            Cùng 80others kết nối yêu thương và vun đắp tình cảm gia đình mỗi ngày.
          </p>
          {/* Decorative elements */}
          <div className="flex items-center gap-2 bg-brand-bg border-2 border-brand-border px-3 py-1.5 rounded-2xl w-fit shadow-pixel-sm">
            <span className="animate-pulse text-sm">💡</span>
            <span className="text-[10px] font-bold text-brand-text/80">Mẹo: Hãy bắt đầu bằng các thẻ WARM để khởi động!</span>
          </div>
        </div>

        {/* Pixel banner image on the right */}
        <div className="relative w-full md:w-56 h-28 border-2 border-brand-outline rounded-xl overflow-hidden shrink-0 shadow-pixel-sm bg-brand-bg">
          <Image
            src="/assets/illustrations/cozy_banner.png"
            alt="Cozy window banner"
            fill
            sizes="224px"
            className="object-cover image-rendering-pixelated"
          />
        </div>
      </section>

      {/* MOBILE ONLY QUICK STATS */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {/* Streak 🔥 */}
        <div className="flex items-center gap-3 bg-orange-50 border-3 border-brand-outline p-3 rounded-2xl shadow-pixel">
          <Flame className="w-8 h-8 text-orange-500 fill-orange-500 shrink-0" />
          <div className="leading-tight">
            <span className="font-pixel text-lg font-bold block">{streak} ngày</span>
            <span className="text-[10px] text-brand-text/70 font-semibold font-cozy">Chuỗi gia đình</span>
          </div>
        </div>

        {/* Connection Points ❤️ */}
        <div className="flex items-center gap-3 bg-pink-50 border-3 border-brand-outline p-3 rounded-2xl shadow-pixel">
          <Heart className="w-8 h-8 text-brand-pink fill-brand-pink shrink-0" />
          <div className="leading-tight">
            <span className="font-pixel text-lg font-bold block">{points}</span>
            <span className="text-[10px] text-brand-text/70 font-semibold font-cozy">Điểm kết nối</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT COLUMN: DRAW CARD (SPANS 2 COLUMNS) */}
        <div className="md:col-span-2 space-y-6">

          {/* 2. TODAY'S CARD WIDGET */}
          <section className="bg-brand-card border-3 border-brand-outline p-5 rounded-3xl shadow-pixel">
            <div className="flex items-center justify-between mb-4 border-b-2 border-brand-border pb-3">
              <h3 className="font-pixel text-lg font-bold flex items-center gap-2">
                🃏 Thẻ hôm nay
              </h3>
              <span className="text-xs font-semibold text-brand-text/50 font-pixel">
                Đã mở: {completedCardIds.length} / 100 thẻ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">

              {/* Card visual representation */}
              <div className="sm:col-span-5 flex justify-center py-4">
                <div
                  className={`relative w-44 h-60 rounded-2xl border-3 border-brand-outline bg-brand-purple p-3 flex flex-col justify-between shadow-pixel-lg text-white select-none transition-transform duration-300 ${isFlipped ? "rotate-y-180 scale-95" : "hover:-translate-y-2 hover:scale-[1.02]"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-pixel text-xs font-bold bg-white/20 px-2 py-0.5 rounded">80others</span>
                    <Sparkles className="w-4 h-4 text-brand-yellow fill-brand-yellow animate-spin" style={{ animationDuration: '5s' }} />
                  </div>

                  {/* Heart graphic in the middle */}
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 mb-2 relative animate-float">
                      <Heart className="w-9 h-9 text-brand-pink fill-brand-pink" />
                    </div>
                    <span className="font-pixel text-xs font-semibold tracking-wider text-white/80">FAMILY CARDS</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-pixel text-white/60">
                    <span>COZY RETRO</span>
                    <span>No. {drawCount + 7}</span>
                  </div>
                </div>
              </div>

              {/* Card content and Draw action */}
              <div className="sm:col-span-7 space-y-4">
                <div className={`p-4 border-3 border-brand-outline rounded-2xl bg-brand-card shadow-pixel-sm transition-opacity duration-300 ${isFlipped ? "opacity-30" : "opacity-100"} flex gap-4 items-start`}>
                  <div className="relative w-14 h-14 shrink-0 border-2 border-brand-outline rounded-xl bg-brand-bg flex items-center justify-center shadow-pixel-sm">
                    <img
                      src={
                        currentCard.deck === "WARM" ? "/assets/decks/warm.png?v=2" :
                          currentCard.deck === "PLAY" ? "/assets/decks/play.png?v=2" :
                            currentCard.deck === "BOND" ? "/assets/decks/bond.png?v=2" :
                              currentCard.deck === "HEART" ? "/assets/decks/heart.png?v=2" :
                                "/assets/decks/safe.png?v=2"
                      }
                      alt={currentCard.deck}
                      className="w-full h-full object-contain p-1 image-rendering-pixelated"
                    />
                  </div>
                  <div className="space-y-1.5 flex-grow">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full border-2 text-[10px] font-bold mb-1 ${currentCard.color}`}>
                      {currentCard.deckTitle}
                    </span>

                    <h4 className="font-cozy font-bold text-sm md:text-base text-brand-text leading-snug">
                      {currentCard.question}
                    </h4>

                    <div className="space-y-1.5 border-t border-brand-border pt-2 text-xs text-brand-text/70">
                      <p className="flex items-center gap-1.5 font-semibold font-pixel">
                        <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
                        <span>{currentCard.listenTip}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDrawCard}
                  className="w-full py-3.5 px-6 bg-brand-purple text-white font-pixel font-bold rounded-2xl border-3 border-brand-outline shadow-pixel hover:shadow-pixel-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <RotateCw className={`w-5 h-5 ${isFlipped ? "animate-spin" : ""}`} />
                  Rút thẻ khác (+30 ❤️)
                </button>
              </div>
            </div>
          </section>

          {/* 3. EMOTION CHECK-IN */}
          <section className="bg-brand-card border-3 border-brand-outline p-5 rounded-3xl shadow-pixel">
            <h3 className="font-pixel text-lg font-bold mb-1 flex items-center gap-2 border-b-2 border-brand-border pb-3">
              <div className="relative w-6 h-6 shrink-0">
                <img
                  src="/assets/moods/nice.png?v=2"
                  alt="Smile Face"
                  className="w-full h-full object-contain image-rendering-pixelated"
                />
              </div>
              Hôm nay bạn cảm thấy thế nào?
            </h3>

            <div className="py-3">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                {[
                  { emoji: "😍", label: "Tuyệt vời", color: "hover:bg-pink-105 hover:border-brand-pink border-2" },
                  { emoji: "🙂", label: "Ổn nhé", color: "hover:bg-amber-105 hover:border-brand-yellow border-2" },
                  { emoji: "😐", label: "Bình thường", color: "hover:bg-purple-105 hover:border-brand-purple border-2" },
                  { emoji: "😔", label: "Không vui", color: "hover:bg-blue-105 hover:border-blue-400 border-2" }
                ].map((item) => {
                  const isSelected = mood === item.emoji;
                  return (
                    <button
                      key={item.emoji}
                      onClick={(e) => handleMoodSelect(item.emoji, e)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${isSelected
                        ? "bg-brand-purple text-white border-3 border-brand-outline scale-105 shadow-pixel-sm font-bold"
                        : `bg-brand-bg text-brand-text border-brand-border ${item.color}`
                        }`}
                    >
                      <div className="relative w-10 h-10 mb-1.5 filter drop-shadow-sm select-none shrink-0">
                        <img
                          src={MOOD_IMAGES[item.emoji]}
                          alt={item.label}
                          className="w-full h-full object-contain image-rendering-pixelated"
                        />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold leading-none font-pixel">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mood advice pop-up bubble */}
              {mood && (
                <div className="mt-4 p-3 bg-brand-bg border-2 border-brand-outline rounded-2xl relative text-xs text-brand-text/90 font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 rotate-45 bg-brand-bg border-l-2 border-t-2 border-brand-outline" />
                  <p className="text-center font-pixel text-[11px] leading-relaxed">
                    {mood === "😍" && "Thật tuyệt! Hãy chia sẻ năng lượng hạnh phúc này bằng cách trò chuyện hoặc giúp đỡ mọi người nhé! 💕"}
                    {mood === "🙂" && "Một ngày bình yên thật tốt. Chúc bạn và gia đình có thêm nhiều tiếng cười tối nay! ☕"}
                    {mood === "😐" && "Mọi chuyện vẫn ổn chứ? Thử rủ người thân uống một cốc trà sữa hay tán gẫu xem sao nha! 🍵"}
                    {mood === "😔" && "Không sao đâu, ngày mai sẽ tốt hơn. Gia đình luôn bên bạn, hãy nói chuyện với người bạn tin cậy nhé. 💜"}
                  </p>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: SIDE CHALENGES & FEED */}
        <div className="space-y-6">

          {/* 4. TODAY'S CHALLENGE WIDGET */}
          {todayChallenge && (
            <section className="bg-brand-card border-3 border-brand-outline p-5 rounded-3xl shadow-pixel flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b-2 border-brand-border pb-3">
                  <h3 className="font-pixel text-lg font-bold flex items-center gap-1.5">
                    📅 Thử thách hôm nay
                  </h3>
                  <Link href="/challenges" className="text-[10px] font-bold text-brand-purple hover:underline flex items-center">
                    Xem tất cả <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="bg-brand-bg border-2 border-brand-border p-4 rounded-2xl relative overflow-hidden mb-4">
                  {/* Decorative package ribbon styled visual indicator */}
                  <div className="absolute right-2 bottom-2 w-14 h-14 opacity-20 bg-brand-purple rounded-full flex items-center justify-center">
                    <Gift className="w-8 h-8 text-brand-text" />
                  </div>

                  <h4 className="font-cozy font-bold text-brand-text leading-tight mb-1 text-sm md:text-base">
                    {todayChallenge.title}
                  </h4>
                  <p className="text-xs text-brand-text/70 mb-4 font-medium">
                    {todayChallenge.description}
                  </p>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-brand-purple">Tiến trình</span>
                      <span>{todayChallenge.progress} / {todayChallenge.maxProgress}</span>
                    </div>
                    <div className="h-3 bg-brand-bg border border-brand-text rounded-full overflow-hidden p-0.5 shadow-inner">
                      <div
                        className="h-full bg-brand-purple-light rounded-full transition-all duration-300"
                        style={{ width: `${(todayChallenge.progress / todayChallenge.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {todayChallenge.completed ? (
                <div className="w-full py-2.5 bg-green-50 text-green-700 font-bold border-2 border-green-500 rounded-2xl flex items-center justify-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-green-600 fill-green-100" />
                  Đã hoàn thành! (+{todayChallenge.points} ❤️)
                </div>
              ) : (
                <button
                  onClick={(e) => handleCompleteChallenge(todayChallenge.id, e)}
                  className="w-full py-3 bg-brand-yellow text-brand-text font-pixel font-bold rounded-2xl border-3 border-brand-text shadow-pixel hover:shadow-pixel-hover hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  Hoàn thành thử thách (+{todayChallenge.points} ❤️)
                </button>
              )}
            </section>
          )}

          {/* 5. COMMUNITY WIDGET */}
          <section className="bg-brand-card border-3 border-brand-outline p-5 rounded-3xl shadow-pixel">
            <div className="flex items-center justify-between mb-4 border-b-2 border-brand-border pb-3">
              <h3 className="font-pixel text-lg font-bold flex items-center gap-1.5">
                📸 Khoảnh khắc ấm áp
              </h3>
              <Link href="/community" className="text-[10px] font-bold text-brand-purple hover:underline flex items-center">
                Xem tất cả <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {moments.slice(0, 2).map((m) => (
                <div key={m.id} className="border-2 border-brand-border p-3 rounded-2xl bg-brand-bg/50 hover:bg-brand-bg transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative w-7 h-7 rounded-full border border-brand-outline overflow-hidden bg-brand-purple-light shrink-0">
                      <Image
                        src="/assets/avatars/avatar.png"
                        alt={m.author}
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-brand-text block">{m.author}</span>
                      <span className="text-[8px] text-brand-text/50 font-semibold">{m.time}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-text/80 font-medium leading-relaxed mb-2 line-clamp-2">
                    {m.content}
                  </p>

                  {/* Photo thumbnail if exists */}
                  {m.photoUrl && (
                    <div className="relative h-24 w-full rounded-xl border border-brand-border overflow-hidden mb-2">
                      <Image
                        src={m.photoUrl}
                        alt="Community moment image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                    </div>
                  )}

                  {/* Quick interact bar */}
                  <div className="flex gap-4 text-[10px] font-bold mt-1 border-t border-brand-border/40 pt-2">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        triggerHeart(rect.left + rect.width / 2, rect.top, 2);
                        likeMoment(m.id);
                      }}
                      className={`flex items-center gap-1 ${m.likedByUser ? "text-brand-pink" : "text-brand-text/70"} hover:scale-105 active:scale-95 transition-transform`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${m.likedByUser ? "fill-brand-pink text-brand-pink" : ""}`} />
                      <span>{m.likes}</span>
                    </button>
                    <div className="flex items-center gap-1 text-brand-text/70">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{m.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
