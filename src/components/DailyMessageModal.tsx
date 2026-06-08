"use client";

import React, { useState, useEffect } from "react";
import { warmQuotes } from "@/constants/quotes";

export function DailyMessageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [notificationStatus, setNotificationStatus] = useState<string>("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNotificationStatus(
        "Notification" in window ? Notification.permission : "denied"
      );

      const todayStr = new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD
      const modalLastShown = localStorage.getItem("80others_daily_modal_shown_date");

      // Load/Generate daily quote
      const getDailyQuote = () => {
        const storedDate = localStorage.getItem("80others_daily_quote_last_date");
        const storedQuote = localStorage.getItem("80others_daily_quote_text");

        if (storedDate === todayStr && storedQuote) {
          return storedQuote;
        }

        // Deterministic hash based on date string
        let hash = 0;
        for (let i = 0; i < todayStr.length; i++) {
          hash = todayStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % warmQuotes.length;
        const newQuote = warmQuotes[index];

        localStorage.setItem("80others_daily_quote_last_date", todayStr);
        localStorage.setItem("80others_daily_quote_text", newQuote);
        return newQuote;
      };

      const dailyQuote = getDailyQuote();
      setQuote(dailyQuote);

      // Show modal once per calendar day
      if (modalLastShown !== todayStr) {
        setIsOpen(true);
        localStorage.setItem("80others_daily_modal_shown_date", todayStr);
      }
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("Trình duyệt của bạn không hỗ trợ tính năng thông báo.");
      setIsOpen(false);
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);

      if (permission === "granted") {
        // Trigger a demo notification using service worker or fallback
        const title = "Cảm ơn bạn đã kết nối! ❤️";
        const options = {
          body: quote,
          icon: "/assets/logo_pixel.png",
          badge: "/assets/logo_pixel.png",
          tag: "daily-message-welcome",
        };

        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(title, options);
          });
        } else {
          new Notification(title, options);
        }

        localStorage.setItem("80others_notifications_subscribed", "true");
        alert("Đã đăng ký nhận thông báo thông điệp ấm áp thành công! 🌟");
      } else {
        alert("Bạn đã từ chối nhận thông báo. Bạn có thể bật lại bằng cách nhấn vào hình chiếc chuông.");
      }
    } catch (error) {
      console.error("Lỗi khi yêu cầu cấp quyền thông báo:", error);
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-text/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-brand-card border-3 border-brand-outline rounded-3xl shadow-pixel max-w-md w-full p-6 relative overflow-hidden animate-in fade-in zoom-in duration-200 text-center">
        {/* Heart Decor */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-2 border-brand-outline bg-brand-pink/15 rounded-full flex items-center justify-center animate-pulse shadow-pixel-sm">
            <i className="hn hn-heart-solid text-brand-pink text-2xl" />
          </div>
        </div>

        {/* Modal Header */}
        <h3 className="font-pixel text-lg sm:text-xl font-bold text-brand-text mb-3 flex items-center justify-center gap-1.5">
          Thông điệp ấm áp hôm nay
          <i className="hn hn-sparkles-solid text-brand-yellow text-xs animate-bounce" />
        </h3>

        {/* Quote Card */}
        <div className="bg-brand-bg border-3 border-brand-outline rounded-2xl p-4 sm:p-5 mb-5 shadow-inner relative overflow-hidden">
          <p className="font-pixel text-xs sm:text-sm text-brand-text leading-relaxed font-semibold italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        {/* Question */}
        {notificationStatus !== "granted" && (
          <p className="text-xs text-brand-text/80 font-cozy leading-relaxed mb-6">
            Bạn có muốn nhận thông điệp gia đình yêu thương mỗi ngày để vun đắp và kết nối tình cảm không?
          </p>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {notificationStatus !== "granted" ? (
            <>
              <button
                onClick={requestNotificationPermission}
                className="flex-1 py-2.5 border-2 border-brand-outline rounded-xl bg-brand-purple text-white font-pixel font-bold text-xs shadow-pixel-sm hover:brightness-105 active:translate-y-0.5 active:translate-x-0.5 transition-all cursor-pointer"
              >
                Nhận mỗi ngày
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 border-2 border-brand-outline rounded-xl bg-brand-bg hover:bg-brand-border text-brand-text font-pixel font-bold text-xs shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 border-2 border-brand-outline rounded-xl bg-brand-purple text-white font-pixel font-bold text-xs shadow-pixel-sm hover:brightness-105 active:translate-y-0.5 active:translate-x-0.5 transition-all cursor-pointer"
            >
              Chúc một ngày ấm áp!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
