"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { triggerHeart } from "@/components/HeartRain";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Coffee, 
  Dices, 
  Camera, 
  Heart, 
  ShieldAlert, 
  ArrowLeft, 
  RotateCw, 
  CheckCircle,
  Sparkles,
  HelpCircle
} from "lucide-react";

interface CardQuestion {
  id: string;
  question: string;
  hint: string;
  listenTip: string;
}

const DECK_QUESTIONS: Record<string, CardQuestion[]> = {
  WARM: [
    {
      id: "w1",
      question: "Điều gì về gia đình khiến bạn cảm thấy tự hào nhất?",
      hint: "Ấm áp • Khởi động",
      listenTip: "Lắng nghe không phán xét, cảm nhận niềm tự hào của nhau."
    },
    {
      id: "w2",
      question: "Ba từ mô tả chính xác nhất không khí gia đình mình là gì?",
      hint: "Ấm áp • Khởi động",
      listenTip: "Cùng so sánh xem các thành viên có chung cảm nhận không."
    },
    {
      id: "w3",
      question: "Kể tên món ăn mẹ nấu mà bạn yêu thích nhất và tại sao?",
      hint: "Ấm áp • Khởi động",
      listenTip: "Một lời khen nhỏ cho món ăn của mẹ sẽ làm ấm lòng cả nhà!"
    },
    {
      id: "w4",
      question: "Nếu được chọn một siêu năng lực cho gia đình mình, đó sẽ là gì?",
      hint: "Ấm áp • Khởi động",
      listenTip: "Hãy bay bổng và cùng tưởng tượng những điều kỳ diệu."
    },
    {
      id: "w5",
      question: "Thói quen nhỏ nào của gia đình làm bạn mỉm cười mỗi khi nghĩ đến?",
      hint: "Ấm áp • Khởi động",
      listenTip: "Trân trọng những niềm vui giản dị hàng ngày."
    }
  ],
  PLAY: [
    {
      id: "p1",
      question: "Oẳn tù tì với người bên cạnh, người thua phải rót nước cho cả nhà.",
      hint: "Tương tác • Tiếng cười",
      listenTip: "Hãy cùng chơi thật vui vẻ và thoải mái!"
    },
    {
      id: "p2",
      question: "Hãy kể một câu chuyện cười hoặc một câu đố vui cho cả nhà.",
      hint: "Tương tác • Tiếng cười",
      listenTip: "Cười đùa chính là liều thuốc gắn kết tốt nhất."
    },
    {
      id: "p3",
      question: "Cùng làm biểu cảm đáng yêu nhất và chụp một tấm ảnh chung!",
      hint: "Tương tác • Lưu niệm",
      listenTip: "Lưu lại khoảnh khắc đáng yêu này để chia sẻ sau nhé."
    },
    {
      id: "p4",
      question: "Hãy giả giọng một thành viên trong nhà để mọi người đoán xem là ai.",
      hint: "Tương tác • Tiếng cười",
      listenTip: "Mô tả bằng sự hài hước và dễ thương của tình thân."
    },
    {
      id: "p5",
      question: "Chọn một bài hát thiếu nhi cả nhà cùng biết và hát chung điệp khúc.",
      hint: "Tương tác • Tiếng cười",
      listenTip: "Âm nhạc giúp xua tan mọi khoảng cách tuổi tác."
    }
  ],
  BOND: [
    {
      id: "b1",
      question: "Lần cuối cùng cả nhà mình đi chơi xa cùng nhau là khi nào?",
      hint: "Thấu hiểu • Kỷ niệm",
      listenTip: "Ôn lại cảm giác chuyến đi và lên kế hoạch cho lần tới."
    },
    {
      id: "b2",
      question: "Kỷ niệm vui vẻ nhất của bạn với anh/chị/em trong nhà là gì?",
      hint: "Thấu hiểu • Kỷ niệm",
      listenTip: "Những trò đùa thơ ấu luôn chứa đựng nhiều điều ngọt ngào."
    },
    {
      id: "b3",
      question: "Đồ vật nào trong nhà gắn liền với nhiều kỷ niệm gia đình nhất?",
      hint: "Thấu hiểu • Gắn kết",
      listenTip: "Mỗi đồ vật đều mang một câu chuyện lịch sử của gia đình."
    },
    {
      id: "b4",
      question: "Bố/mẹ có nhớ ngày đầu tiên bạn đi học lớp một như thế nào không?",
      hint: "Thấu hiểu • Lắng nghe",
      listenTip: "Lắng nghe lời kể của bố mẹ để thấy chúng ta đã lớn khôn thế nào."
    },
    {
      id: "b5",
      question: "Lần đầu tiên cả nhà mình chụp ảnh chung là ở đâu?",
      hint: "Thấu hiểu • Kỷ niệm",
      listenTip: "Tìm lại bức ảnh cũ nếu có thể để cùng ngắm nhìn."
    }
  ],
  HEART: [
    {
      id: "h1",
      question: "Điều gì bạn muốn cảm ơn bố mẹ nhưng chưa từng nói?",
      hint: "Yêu thương • Cảm xúc",
      listenTip: "Hãy nói bằng cả trái tim, lắng nghe bằng sự biết ơn."
    },
    {
      id: "h2",
      question: "Nếu được nói một lời yêu thương ngay bây giờ, bạn sẽ nói với ai?",
      hint: "Yêu thương • Cảm xúc",
      listenTip: "Đừng ngần ngại bày tỏ tình cảm trực tiếp với người đó."
    },
    {
      id: "h3",
      question: "Khi bạn buồn, hành động nào của gia đình khiến bạn ấm lòng nhất?",
      hint: "Yêu thương • Cảm xúc",
      listenTip: "Hiểu được cách đối phương muốn được an ủi và vỗ về."
    },
    {
      id: "h4",
      question: "Điều gì bạn trân trọng nhất ở người ngồi đối diện bạn lúc này?",
      hint: "Yêu thương • Gắn kết",
      listenTip: "Trao nhau ánh mắt chân thành và sự công nhận quý giá."
    },
    {
      id: "h5",
      question: "Bạn muốn gia đình mình cùng nhau thực hiện ước mơ nào nhất?",
      hint: "Yêu thương • Ước mơ",
      listenTip: "Cùng nhau chia sẻ tầm nhìn và nâng đỡ hoài bão của nhau."
    }
  ],
  SAFE: [
    {
      id: "s1",
      question: "Lá bài quyền im lặng: Bạn được bỏ qua lượt này và lắng nghe người khác.",
      hint: "Quyền im lặng • An toàn",
      listenTip: "Tôn trọng sự im lặng ấm áp của đối phương."
    },
    {
      id: "s2",
      question: "Bạn có thể chọn một thành viên khác trả lời thay cho bạn lá bài này.",
      hint: "Quyền im lặng • Chuyển lượt",
      listenTip: "Người được chọn hãy vui vẻ đón nhận lá bài nhé!"
    },
    {
      id: "s3",
      question: "Quyền im lặng: Hãy trao một cái ôm ấm áp thay cho câu trả lời của bạn.",
      hint: "Quyền im lặng • Hành động",
      listenTip: "Cái ôm có sức mạnh gắn kết hơn ngàn lời nói."
    },
    {
      id: "s4",
      question: "Bạn được quyền đặt một câu hỏi bất kỳ cho người đối diện trả lời.",
      hint: "Quyền im lặng • Hỏi đáp",
      listenTip: "Hãy hỏi một câu hỏi nhẹ nhàng và chân thành."
    },
    {
      id: "s5",
      question: "Lá bài im lặng: Cả nhà cùng im lặng và nắm tay nhau trong 10 giây.",
      hint: "Quyền im lặng • Chạm kết nối",
      listenTip: "Cảm nhận sự hiện diện bình yên của nhau trong tĩnh lặng."
    }
  ]
};

const DECKS_CONFIG = [
  {
    key: "WARM",
    title: "WARM CARDS",
    subtitle: "Khởi động",
    desc: "Những câu hỏi nhẹ nhàng để mở lời và làm ấm bầu không khí.",
    icon: Coffee,
    emoji: "☕",
    image: "/assets/decks/warm.png",
    cardCount: 20,
    color: "bg-amber-100 border-amber-400 text-amber-700",
    bgClass: "bg-amber-500",
    shadowColor: "shadow-pixel-color-yellow"
  },
  {
    key: "PLAY",
    title: "PLAY CARDS",
    subtitle: "Tương tác",
    desc: "Các thử thách tương tác vui nhộn mang lại tiếng cười cho cả nhà.",
    icon: Dices,
    emoji: "🎲",
    image: "/assets/decks/play.png",
    cardCount: 20,
    color: "bg-blue-100 border-blue-400 text-blue-700",
    bgClass: "bg-blue-500",
    shadowColor: "shadow-pixel"
  },
  {
    key: "BOND",
    title: "BOND CARDS",
    subtitle: "Thấu hiểu",
    desc: "Nhớ lại kỷ niệm và cùng nhau thấu hiểu sâu sắc hơn về nhau.",
    icon: Camera,
    emoji: "📸",
    image: "/assets/decks/bond.png",
    cardCount: 20,
    color: "bg-purple-100 border-purple-400 text-brand-purple",
    bgClass: "bg-brand-purple",
    shadowColor: "shadow-pixel-color-purple"
  },
  {
    key: "HEART",
    title: "HEART CARDS",
    subtitle: "Yêu thương",
    desc: "Bộc lộ những cảm xúc sâu kín và gửi lời yêu thương ngọt ngào.",
    icon: Heart,
    emoji: "💌",
    image: "/assets/decks/heart.png",
    cardCount: 20,
    color: "bg-pink-100 border-pink-400 text-brand-pink",
    bgClass: "bg-brand-pink",
    shadowColor: "shadow-pixel-color-pink"
  },
  {
    key: "SAFE",
    title: "SAFE CARDS",
    subtitle: "Quyền im lặng",
    desc: "Khi ai đó cần không gian riêng, tạo cảm giác an toàn tuyệt đối.",
    icon: ShieldAlert,
    emoji: "🛡️",
    image: "/assets/decks/safe.png",
    cardCount: 10,
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
  const [currentCard, setCurrentCard] = useState<CardQuestion | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeDeck = DECKS_CONFIG.find((d) => d.key === activeDeckKey);

  // Automatically open card draw when tab=today query parameter is set
  useEffect(() => {
    if (tab === "today") {
      const randomDecks = ["HEART", "WARM", "PLAY", "BOND"];
      const randomDeck = randomDecks[Math.floor(Math.random() * randomDecks.length)];
      const questions = DECK_QUESTIONS[randomDeck];
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      
      setActiveDeckKey(randomDeck);
      setCurrentCard(randomQuestion);
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

    const questions = DECK_QUESTIONS[deckKey];
    const initialCard = questions[Math.floor(Math.random() * questions.length)];
    
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
    const questions = DECK_QUESTIONS[activeDeckKey];
    
    setTimeout(() => {
      // Find a card different from the current if possible
      let nextCard = currentCard;
      while (nextCard?.id === currentCard?.id && questions.length > 1) {
        nextCard = questions[Math.floor(Math.random() * questions.length)];
      }
      setCurrentCard(nextCard || questions[0]);
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      
      {/* 1. DECK TITLE */}
      <section className="bg-brand-card border-3 border-brand-outline p-6 rounded-3xl shadow-pixel">
        <h2 className="font-pixel text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
          🗂️ Khám phá các bộ bài
        </h2>
        <p className="text-brand-text/80 text-sm font-semibold">
          80others bao gồm 5 bộ bài với các chủ đề khác nhau, giúp gia đình bạn từng bước mở lòng, tương tác vui vẻ và thấu hiểu nhau sâu sắc hơn.
        </p>
      </section>

      {/* 2. DECKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {DECKS_CONFIG.map((deck) => {
          return (
            <div
              key={deck.key}
              onClick={(e) => handleSelectDeck(deck.key, e)}
              className={`bg-brand-card border-3 border-brand-outline p-5 rounded-3xl cursor-pointer transition-all transform hover:-translate-y-1.5 active:translate-y-0 shadow-pixel ${deck.shadowColor} flex flex-col justify-between h-72`}
            >
              <div className="space-y-4">
                {/* Header of the deck box */}
                <div className="flex justify-between items-start">
                  <div className="relative w-12 h-12 rounded-2xl border-2 border-brand-outline bg-brand-bg flex items-center justify-center shadow-pixel-sm overflow-hidden shrink-0">
                    <img
                      src={`${deck.image}?v=2`}
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
                    {deck.emoji} {deck.subtitle}
                  </h3>
                  <p className="text-xs text-brand-text/70 leading-relaxed font-semibold">
                    {deck.desc}
                  </p>
                </div>
              </div>

              {/* Bottom deck box detail */}
              <div className="border-t-2 border-brand-border pt-3 mt-4 flex items-center justify-between text-[11px] font-bold text-brand-purple">
                <span>Khám phá bộ bài</span>
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
                  className="flex items-center gap-1 text-xs font-bold text-brand-text/60 hover:text-brand-text font-pixel"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại
                </button>
                <span className="font-pixel text-xs font-bold bg-brand-outline text-white px-2 py-0.5 rounded">
                  {activeDeck.subtitle}
                </span>
              </div>

              {/* The big 3D flip card card container */}
              <div className="flex justify-center py-2 perspective-1000">
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-56 h-76 transform-style-3d cursor-pointer shadow-pixel-lg rounded-2xl"
                  onClick={handleDrawNext}
                >
                  {/* CARD FRONT SIDE (Question card) */}
                  <div 
                    className={`absolute inset-0 backface-hidden rounded-2xl border-3 border-brand-outline p-4 flex flex-col justify-between bg-white text-brand-text overflow-hidden ${
                      isFlipped ? "pointer-events-none" : ""
                    }`}
                  >
                    {/* Top border decoration */}
                    <div className="flex justify-between items-center text-[10px] font-pixel text-brand-text/50">
                      <span>80OTHERS DECK</span>
                      <span>No. {currentCard.id}</span>
                    </div>

                    <div className="flex flex-col items-center text-center justify-center flex-grow py-4 gap-2">
                      <div className="relative w-16 h-16 shrink-0 border-2 border-brand-outline rounded-xl bg-brand-bg flex items-center justify-center shadow-pixel-sm mb-1">
                        <img
                          src={`${activeDeck.image}?v=2`}
                          alt={activeDeck.title}
                          className="w-full h-full object-contain p-1.5 image-rendering-pixelated"
                        />
                      </div>
                      <h4 className="font-cozy font-bold text-sm md:text-base leading-relaxed text-brand-text px-1">
                        {currentCard.question}
                      </h4>
                    </div>

                    {/* Bottom tip decoration */}
                    <div className="border-t border-brand-border pt-2.5 text-[10px] text-brand-text/60 font-semibold text-center italic font-pixel">
                      {currentCard.hint}
                    </div>
                  </div>

                  {/* CARD BACK SIDE (Pattern card) */}
                  <div 
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-3 border-brand-outline p-4 flex flex-col justify-between text-white overflow-hidden ${
                      activeDeck.bgClass
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-pixel text-xs font-bold">80others</span>
                      <Sparkles className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                    </div>
                    
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/25 mb-1.5 animate-pulse">
                        <Heart className="w-8 h-8 text-brand-pink fill-brand-pink" />
                      </div>
                      <span className="font-pixel text-[10px] font-semibold text-white/70 tracking-widest">FAMILY TIME</span>
                    </div>

                    <div className="flex justify-between items-center text-[8px] font-pixel text-white/50">
                      <span>RETRO PIXEL</span>
                      <span>COZY DECK</span>
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* Tips for listening */}
              <div className="bg-brand-bg border-2 border-brand-border p-3 rounded-2xl text-xs text-brand-text/80 font-semibold text-center">
                💡 <span className="text-brand-text font-bold">Lắng nghe:</span> {currentCard.listenTip}
              </div>

              {/* Interactive buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDrawNext}
                  className="py-3 px-4 bg-brand-bg text-brand-text font-pixel font-bold rounded-2xl border-3 border-brand-outline shadow-pixel hover:shadow-pixel-hover hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                  Rút thẻ khác
                </button>

                {isCompleted ? (
                  <div className="py-3 px-4 bg-green-50 text-green-700 font-bold border-2 border-green-500 rounded-2xl flex items-center justify-center gap-1 text-xs font-pixel">
                    Đã hoàn thành!
                  </div>
                ) : (
                  <button
                    onClick={handleCompleteCard}
                    className="py-3 px-4 bg-brand-pink text-white font-pixel font-bold rounded-2xl border-3 border-brand-outline shadow-pixel hover:shadow-pixel-hover hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Hoàn thành (+30 ❤️)
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
