"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly";
  points: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

export interface Moment {
  id: string;
  author: string;
  time: string;
  content: string;
  photoUrl?: string;
  likes: number;
  comments: number;
  likedByUser?: boolean;
}

export interface Card {
  id: string;
  deck: "WARM" | "PLAY" | "BOND" | "HEART" | "SAFE";
  deckTitle: string;
  question: string;
  hint: string;
  listenTip: string;
  color: string;
  borderColor: string;
  bgLight: string;
  emoji: string;
}

interface AppContextType {
  points: number;
  streak: number;
  completedCount: number;
  mood: string | null;
  challenges: Challenge[];
  moments: Moment[];
  completedCardIds: string[];
  addPoints: (amount: number) => void;
  setMood: (mood: string) => void;
  completeChallenge: (id: string) => void;
  addMoment: (content: string, author?: string) => void;
  likeMoment: (id: string) => void;
  addCompletedCard: (cardId: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(1248);
  const [streak, setStreak] = useState(7);
  const [completedCount, setCompletedCount] = useState(42);
  const [mood, setMoodState] = useState<string | null>(null);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "d1",
      title: "Cùng nhau ăn tối không điện thoại",
      description: "Dành thời gian chất lượng với gia đình.",
      type: "daily",
      points: 50,
      progress: 0,
      maxProgress: 1,
      completed: false,
    },
    {
      id: "d2",
      title: "Hỏi bố/mẹ về kỷ niệm thời còn trẻ",
      description: "Lắng nghe và hiểu thêm về quá khứ của bố/mẹ.",
      type: "daily",
      points: 100,
      progress: 0,
      maxProgress: 1,
      completed: false,
    },
    {
      id: "d3",
      title: "Nói lời cảm ơn với một thành viên",
      description: "Một lời cảm ơn nhỏ có thể làm ai đó hạnh phúc cả ngày!",
      type: "daily",
      points: 50,
      progress: 0,
      maxProgress: 1,
      completed: false,
    },
    {
      id: "d4",
      title: "Cùng nhau làm một việc nhà",
      description: "Cùng nhau chia sẻ và gắn kết những việc nhỏ.",
      type: "daily",
      points: 80,
      progress: 0,
      maxProgress: 1,
      completed: false,
    },
    {
      id: "w1",
      title: "Chơi 5 lá HEART CARD",
      description: "Chia sẻ yêu thương với các thành viên.",
      type: "weekly",
      points: 250,
      progress: 2,
      maxProgress: 5,
      completed: false,
    },
    {
      id: "w2",
      title: "Hoàn thành 3 thử thách ngày",
      description: "Kiên trì gắn kết gia đình.",
      type: "weekly",
      points: 150,
      progress: 1,
      maxProgress: 3,
      completed: false,
    },
  ]);

  const [moments, setMoments] = useState<Moment[]>([
    {
      id: "m1",
      author: "Linh & Mẹ",
      time: "2 giờ trước",
      content: "Hôm nay tụi mình rút được HEART CARD, mẹ đã bật khóc khi kể về điều này... 💜 Cảm ơn 80others vì những giây phút lắng đọng này.",
      photoUrl: "/assets/illustrations/cozy_fireplace.png",
      likes: 128,
      comments: 16,
    },
    {
      id: "m2",
      author: "Gia đình Minh",
      time: "3 giờ trước",
      content: "Thử thách tối không điện thoại thành công rực rỡ! 🌟 Cả nhà ăn cơm nói chuyện vui vẻ lắm, lâu lắm rồi mới có bữa cơm trọn vẹn như thế.",
      photoUrl: "/assets/illustrations/family_dinner.png",
      likes: 96,
      comments: 8,
    },
    {
      id: "m3",
      author: "Trang",
      time: "5 giờ trước",
      content: "Bắt đầu ngày mới với một lá WARM CARD, chúc cả nhà luôn ấm áp!",
      likes: 45,
      comments: 2,
    },
  ]);

  const [completedCardIds, setCompletedCardIds] = useState<string[]>([]);
  const [theme, setThemeState] = useState<"light" | "dark">("dark");

  // Load from LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("80others_theme") as "light" | "dark" | null;
    const finalTheme = savedTheme || "dark";
    setThemeState(finalTheme);
    document.body.classList.toggle("dark", finalTheme === "dark");

    const savedPoints = localStorage.getItem("80others_points");
    const savedStreak = localStorage.getItem("80others_streak");
    const savedCompletedCount = localStorage.getItem("80others_completedCount");
    const savedMood = localStorage.getItem("80others_mood");
    const savedChallenges = localStorage.getItem("80others_challenges");
    const savedMoments = localStorage.getItem("80others_moments");
    const savedCards = localStorage.getItem("80others_completedCards");

    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedCompletedCount) setCompletedCount(parseInt(savedCompletedCount));
    if (savedMood) setMoodState(savedMood);
    if (savedChallenges) setChallenges(JSON.parse(savedChallenges));
    if (savedMoments) setMoments(JSON.parse(savedMoments));
    if (savedCards) setCompletedCardIds(JSON.parse(savedCards));
  }, []);

  // Save helper
  const saveState = (key: string, value: any) => {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  };

  const addPoints = (amount: number) => {
    setPoints((prev) => {
      const newVal = prev + amount;
      saveState("80others_points", newVal);
      return newVal;
    });
  };

  const setMood = (newMood: string) => {
    setMoodState((prev) => {
      const finalMood = prev === newMood ? null : newMood;
      if (finalMood) {
        saveState("80others_mood", finalMood);
      } else {
        localStorage.removeItem("80others_mood");
      }
      return finalMood;
    });
  };

  const completeChallenge = (id: string) => {
    setChallenges((prev) => {
      const updated = prev.map((ch) => {
        if (ch.id === id && !ch.completed) {
          const newProgress = Math.min(ch.progress + 1, ch.maxProgress);
          const isDone = newProgress === ch.maxProgress;
          if (isDone) {
            addPoints(ch.points);
            // If it's a daily, also count towards weekly "Hoàn thành 3 thử thách"
            if (ch.type === "daily") {
              setTimeout(() => updateWeeklyChallengeProgress("w2", 1), 100);
            }
          }
          return { ...ch, progress: newProgress, completed: isDone };
        }
        return ch;
      });
      saveState("80others_challenges", updated);
      return updated;
    });
  };

  const updateWeeklyChallengeProgress = (id: string, amount: number) => {
    setChallenges((prev) => {
      const updated = prev.map((ch) => {
        if (ch.id === id && !ch.completed) {
          const newProgress = Math.min(ch.progress + amount, ch.maxProgress);
          const isDone = newProgress === ch.maxProgress;
          if (isDone) {
            addPoints(ch.points);
          }
          return { ...ch, progress: newProgress, completed: isDone };
        }
        return ch;
      });
      saveState("80others_challenges", updated);
      return updated;
    });
  };

  const addMoment = (content: string, author: string = "Tôi & Gia đình") => {
    const newMoment: Moment = {
      id: "m_" + Date.now(),
      author,
      time: "Vừa xong",
      content,
      likes: 0,
      comments: 0,
    };
    setMoments((prev) => {
      const updated = [newMoment, ...prev];
      saveState("80others_moments", updated);
      return updated;
    });
    addPoints(20); // Bonus for sharing
    // Count towards weekly "Chia sẻ 1 khoảnh khắc"
    // (Here we don't have a w3 in default list, but we can update completed cards count or profile)
  };

  const likeMoment = (id: string) => {
    setMoments((prev) => {
      const updated = prev.map((m) => {
        if (m.id === id) {
          const liked = !m.likedByUser;
          return {
            ...m,
            likes: liked ? m.likes + 1 : m.likes - 1,
            likedByUser: liked,
          };
        }
        return m;
      });
      saveState("80others_moments", updated);
      return updated;
    });
  };

  const addCompletedCard = (cardId: string) => {
    setCompletedCardIds((prev) => {
      if (!prev.includes(cardId)) {
        const updated = [...prev, cardId];
        saveState("80others_completedCards", updated);
        
        // Increment completed count
        setCompletedCount((prevCount) => {
          const newCount = prevCount + 1;
          saveState("80others_completedCount", newCount);
          return newCount;
        });

        // Add points
        addPoints(30);

        // Update weekly challenge "Chơi 5 lá HEART CARD" (if applicable)
        setTimeout(() => updateWeeklyChallengeProgress("w1", 1), 100);

        return updated;
      }
      return prev;
    });
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("80others_theme", newTheme);
      document.body.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  };

  return (
    <AppContext.Provider
      value={{
        points,
        streak,
        completedCount,
        mood,
        challenges,
        moments,
        completedCardIds,
        addPoints,
        setMood,
        completeChallenge,
        addMoment,
        likeMoment,
        addCompletedCard,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
