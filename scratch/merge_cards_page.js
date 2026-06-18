const fs = require('fs');
const path = require('path');

const cardsJson = fs.readFileSync(path.join(__dirname, 'cards_data.json'), 'utf8');
const cards = JSON.parse(cardsJson);

const code = `"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { triggerHeart } from "@/components/HeartRain";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: string;
  category: "WARM" | "PLAY" | "BOND" | "HEART" | "SAFE";
  symbol: "GD" | "BT" | "BM-C" | "ACE" | "OB-C" | "TH" | "AT";
  frontImage: string;
  backImage: string;
}

const CARDS_DATA: Card[] = ${JSON.stringify(cards, null, 2)};

const SYMBOL_DETAILS: Record<string, { name: string; desc: string; tip: string }> = {
  "GD": {
    name: "Cả gia đình",
    desc: "Cả gia đình / ai cũng có thể trả lời",
    tip: "Lắng nghe không phán xét, chia sẻ suy nghĩ chung của cả nhà để thêm phần gắn kết."
  },
  "BT": {
    name: "Tự chia sẻ",
    desc: "Người rút lá tự chia sẻ",
    tip: "Tập trung lắng nghe người rút lá chia sẻ trọn vẹn câu chuyện cá nhân của họ."
  },
  "BM-C": {
    name: "Bố mẹ - Con cái",
    desc: "Bố mẹ với con cái tương tác",
    tip: "Lắng nghe cởi mở, tôn trọng góc nhìn khác biệt để thu hẹp khoảng cách thế hệ."
  },
  "ACE": {
    name: "Anh/chị/em",
    desc: "Anh/chị/em chia sẻ",
    tip: "Thấu hiểu và chia sẻ chân thành với anh chị em trong nhà để cảm thông lẫn nhau."
  },
  "OB-C": {
    name: "Ông bà - Cháu",
    desc: "Ông bà với cháu / con cháu tương tác",
    tip: "Lắng nghe lời khuyên dạy và chia sẻ tình thương gắn kết giữa các thế hệ."
  },
  "TH": {
    name: "Thế hệ",
    desc: "Người lớn với người trẻ",
    tip: "Tôn trọng sự khác biệt thế hệ, lắng nghe với thái độ cầu thị học hỏi lẫn nhau."
  },
  "AT": {
    name: "An toàn cảm xúc",
    desc: "Lá an toàn cảm xúc",
    tip: "Tạo không gian thoải mái, tôn trọng quyền im lặng hoặc trao cái ôm ấm áp để kết nối."
  }
};

const DECKS_CONFIG = [
  {
    key: "WARM",
    title: "LEVEL 1",
    subtitle: "Khởi động",
    desc: "Những câu hỏi nhẹ nhàng để mở lời và làm ấm bầu không khí.",
    icon: "hn-lightbulb-solid",
    image: "/assets/decks/warm.png",
    cardCount: 15,
    color: "bg-amber-100 border-amber-400 text-amber-700",
    bgClass: "bg-amber-500",
    shadowColor: "shadow-pixel-color-yellow"
  },
  {
    key: "PLAY",
    title: "LEVEL 2",
    subtitle: "Tương tác",
    desc: "Các thử thách tương tác vui nhộn mang lại tiếng cười cho cả nhà.",
    icon: "hn-play-solid",
    image: "/assets/decks/play.png",
    cardCount: 15,
    color: "bg-blue-100 border-blue-400 text-blue-700",
    bgClass: "bg-blue-500",
    shadowColor: "shadow-pixel"
  },
  {
    key: "BOND",
    title: "LEVEL 3",
    subtitle: "Thấu hiểu",
    desc: "Nhớ lại kỷ niệm và cùng nhau thấu hiểu sâu sắc hơn về nhau.",
    icon: "hn-retro-camera-solid",
    image: "/assets/decks/bond.png",
    cardCount: 18,
    color: "bg-purple-100 border-purple-400 text-brand-purple",
    bgClass: "bg-brand-purple",
    shadowColor: "shadow-pixel-color-purple"
  },
  {
    key: "HEART",
    title: "LEVEL 4",
    subtitle: "Yêu thương",
    desc: "Bộc lộ những cảm xúc sâu kín và gửi lời yêu thương ngọt ngào.",
    icon: "hn-heart-solid",
    image: "/assets/decks/heart.png",
    cardCount: 14,
    color: "bg-pink-100 border-pink-400 text-brand-pink",
    bgClass: "bg-brand-pink",
    shadowColor: "shadow-pixel-color-pink"
  },
  {
    key: "SAFE",
    title: "LEVEL 5",
    subtitle: "An toàn cảm xúc",
    desc: "Khi ai đó cần không gian riêng, tạo cảm giác an toàn tuyệt đối.",
    icon: "hn-lock-solid",
    image: "/assets/decks/safe.png",
    cardCount: 4,
    color: "bg-slate-100 border-slate-400 text-slate-700",
    bgClass: "bg-slate-500",
    shadowColor: "shadow-pixel"
  }
];

export default function CardsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg flex items-center justify-center font-pixel text-brand-text">Đang tải...</div>}>
      <CardsPageContent />
    </Suspense>
  );
}

function CardsPageContent() {
  const { addCompletedCard } = useApp();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  
  const [activeDeckKey, setActiveDeckKey] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeDeck = DECKS_CONFIG.find((d) => d.key === activeDeckKey);

  // Automatically open card draw when tab=today query parameter is set
  useEffect(() => {
    if (tab === "today") {
      const randomDecks = ["HEART", "WARM", "PLAY", "BOND"];
      const randomDeck = randomDecks[Math.floor(Math.random() * randomDecks.length)] as Card["category"];
      const matchingCards = CARDS_DATA.filter((c) => c.category === randomDeck);
      const randomCard = matchingCards[Math.floor(Math.random() * matchingCards.length)];
      
      setActiveDeckKey(randomDeck);
      setCurrentCard(randomCard);
      setIsFlipped(false);
      setIsCompleted(false);
    } else {
      setActiveDeckKey(null);
      setCurrentCard(null);
    }
  }, [tab]);

  const handleSelectDeck = (deckKey: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 3);

    const matchingCards = CARDS_DATA.filter((c) => c.category === deckKey);
    const initialCard = matchingCards[Math.floor(Math.random() * matchingCards.length)];
    
    setActiveDeckKey(deckKey);
    setCurrentCard(initialCard);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  const handleDrawNext = (e: React.MouseEvent) => {
    if (!activeDeckKey) return;
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 2);

    setIsFlipped(true);
    const matchingCards = CARDS_DATA.filter((c) => c.category === activeDeckKey);
    
    setTimeout(() => {
      let nextCard = currentCard;
      while (nextCard?.id === currentCard?.id && matchingCards.length > 1) {
        nextCard = matchingCards[Math.floor(Math.random() * matchingCards.length)];
      }
      setCurrentCard(nextCard || matchingCards[0]);
      setIsFlipped(false);
      setIsCompleted(false);
    }, 250);
  };

  const handleCompleteCard = (e: React.MouseEvent) => {
    if (!currentCard) return;
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeart(rect.left + rect.width / 2, rect.top, 6);
    
    setIsCompleted(true);
    addCompletedCard(currentCard.id);

    confetti({
      particleCount: 100,
      spread: 70,
      colors: ["#8B5CF6", "#F472B6", "#FBBF24", "#C084FC"],
      origin: { y: 0.6 }
    });
  };

  const handleClose = () => {
    setActiveDeckKey(null);
    setCurrentCard(null);
  };

  const symbolInfo = currentCard ? SYMBOL_DETAILS[currentCard.symbol] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      
      {/* 1. DECK TITLE */}
      <section className="bg-brand-card border-3 border-brand-outline p-6 rounded-3xl shadow-pixel">
        <h2 className="font-pixel text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
          <i className="hn hn-grid-solid text-brand-purple text-[22px]" />
          Khám phá các cấp độ bộ bài
        </h2>
        <p className="text-brand-text/80 text-sm font-semibold">
          80others bao gồm 5 cấp độ kết nối từ dễ đến khó (Level 1 đến Level 5), giúp gia đình bạn từng bước mở lòng, tương tác vui vẻ và thấu hiểu nhau sâu sắc hơn.
        </p>
      </section>

      {/* 2. DECKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {DECKS_CONFIG.map((deck) => {
          return (
            <div
              key={deck.key}
              onClick={(e) => handleSelectDeck(deck.key, e)}
              className={\`bg-brand-card border-3 border-brand-outline p-5 rounded-3xl cursor-pointer transition-all transform hover:-translate-y-1.5 active:translate-y-0 shadow-pixel \${deck.shadowColor} flex flex-col justify-between h-72\`}
            >
              <div className="space-y-4">
                {/* Header of the deck box */}
                <div className="flex justify-between items-start">
                  <div className="relative w-12 h-12 rounded-2xl border-2 border-brand-outline bg-brand-bg flex items-center justify-center shadow-pixel-sm overflow-hidden shrink-0">
                    <img
                      src={\`\${deck.image}?v=2\`}
                      alt={deck.title}
                      className="w-full h-full object-contain p-1.5 image-rendering-pixelated"
                    />
                  </div>
                  <span className="font-pixel text-[10px] font-bold bg-brand-outline text-white px-2 py-0.5 rounded-md">
                    {deck.cardCount} THẺ
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="font-pixel text-xs font-bold text-brand-text/60 tracking-wider">
                    {deck.title}
                  </span>
                  <h3 className="font-cozy font-extrabold text-lg text-brand-text leading-tight flex items-center gap-1.5">
                    <i className={\`hn \${deck.icon} text-[18px]\`} />
                    {deck.subtitle}
                  </h3>
                  <p className="text-xs text-brand-text/70 leading-relaxed font-semibold">
                    {deck.desc}
                  </p>
                </div>
              </div>

              {/* Bottom deck box detail */}
              <div className="border-t-2 border-brand-border pt-3 mt-4 flex items-center justify-between text-[11px] font-bold text-brand-purple">
                <span>Rút thẻ tự động</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. DRAW CARD MODAL OVERLAY */}
      <AnimatePresence>
        {activeDeck && currentCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-text/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-card border-3 border-brand-outline p-6 rounded-3xl shadow-pixel-lg max-w-md w-full relative space-y-6"
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between border-b-2 border-brand-border pb-3">
                <button
                  onClick={handleClose}
                  className="flex items-center gap-1 text-xs font-bold text-brand-text/60 hover:text-brand-text font-pixel cursor-pointer"
                >
                  <i className="hn hn-angle-left-solid text-[16px]" /> Quay lại
                </button>
                <span className="font-pixel text-xs font-bold bg-brand-outline text-white px-2 py-0.5 rounded">
                  {activeDeck.title} - {activeDeck.subtitle}
                </span>
              </div>

              {/* The big 3D flip card card container */}
              <div className="flex justify-center py-2 perspective-1000">
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-64 h-96 transform-style-3d cursor-pointer shadow-pixel-lg rounded-3xl bg-transparent"
                  onClick={handleDrawNext}
                >
                  {/* CARD FRONT SIDE (Question card image) */}
                  <div 
                    className={\`absolute inset-0 backface-hidden rounded-3xl overflow-hidden bg-transparent \${
                      isFlipped ? "pointer-events-none" : ""
                    }\`}
                  >
                    <img
                      src={currentCard.frontImage}
                      alt="Mặt trước lá bài"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* CARD BACK SIDE (Pattern card image) */}
                  <div 
                    className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden bg-transparent"
                  >
                    <img
                      src={currentCard.backImage}
                      alt="Mặt sau lá bài"
                      className="w-full h-full object-contain"
                    />
                  </div>

                </motion.div>
              </div>

              {/* Tips for listening & Symbol descriptions */}
              {symbolInfo && (
                <div className="bg-brand-bg border-2 border-brand-border p-4 rounded-2xl text-xs text-brand-text/80 font-semibold space-y-2">
                  <div className="flex items-center gap-2 border-b border-brand-border pb-2">
                    <span className="font-pixel text-[10px] font-bold bg-brand-outline text-white px-2 py-0.5 rounded uppercase">
                      Ký hiệu: {currentCard.symbol}
                    </span>
                    <span className="text-brand-text font-bold">
                      {symbolInfo.desc}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 pt-1 leading-relaxed">
                    <i className="hn hn-lightbulb-solid text-brand-yellow text-[14px] shrink-0 mt-0.5" />
                    <span><span className="text-brand-text font-bold">Gợi ý lắng nghe:</span> {symbolInfo.tip}</span>
                  </div>
                </div>
              )}

              {/* Interactive buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDrawNext}
                  className="py-3 px-4 bg-brand-bg text-brand-text font-pixel font-bold rounded-2xl border-3 border-brand-outline shadow-pixel hover:shadow-pixel-hover hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <i className="hn hn-refresh text-[14px]" />
                  Rút thẻ khác
                </button>

                {isCompleted ? (
                  <div className="challenge-done py-3 px-4 font-bold border-2 rounded-2xl flex items-center justify-center gap-1 text-xs font-pixel">
                    <i className="hn hn-check-circle-solid text-[14px]" />
                    Đã hoàn thành!
                  </div>
                ) : (
                  <button
                    onClick={handleCompleteCard}
                    className="py-3 px-4 bg-brand-pink text-white font-pixel font-bold rounded-2xl border-3 border-brand-outline shadow-pixel hover:shadow-pixel-hover hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <i className="hn hn-check-circle-solid text-[14px]" />
                    Hoàn thành (+30 <i className="hn hn-heart-solid text-[14px]" />)
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'cards', 'page.tsx'), code);
console.log("Successfully wrote pages.tsx");
