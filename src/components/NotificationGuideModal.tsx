"use client";

import React from "react";
import { Share } from "lucide-react";

interface NotificationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "unsupported" | "denied";
}

export const NotificationGuideModal: React.FC<NotificationGuideModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  // Detect platform for install/enable instructions
  const getPlatform = () => {
    if (typeof navigator === "undefined") return "desktop";
    const ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua)) return "ios";
    if (/android/i.test(ua)) return "android";
    return "desktop";
  };

  const platform = getPlatform();

  return (
    <div className="fixed inset-0 bg-brand-text/60 backdrop-blur-md z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-brand-card border-3 border-brand-outline rounded-3xl shadow-pixel max-w-md w-full p-6 relative overflow-hidden animate-in fade-in zoom-in duration-200 text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 border-b-2 border-brand-border pb-3">
          <h3 className="font-pixel text-lg sm:text-xl font-bold text-brand-text flex items-center gap-2">
            <i className={`hn ${type === "unsupported" ? "hn-bell-solid text-brand-purple" : "hn-exclamation-solid text-brand-pink"} text-lg`} />
            {type === "unsupported" ? "Bật thông báo 80others" : "Quyền thông báo bị chặn"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 border-2 border-brand-outline rounded-lg bg-brand-bg hover:bg-brand-border cursor-pointer flex items-center justify-center transition-colors shadow-pixel-sm active:translate-y-0.5 active:translate-x-0.5"
            aria-label="Đóng"
          >
            <i className="hn hn-times-solid text-[16px] text-brand-text" />
          </button>
        </div>

        {/* Content */}
        <div className="text-left font-cozy text-brand-text text-xs sm:text-sm space-y-4 mb-6 leading-relaxed">
          {type === "unsupported" ? (
            <>
              {platform === "ios" ? (
                <>
                  <p className="font-semibold text-brand-purple font-pixel text-center mb-2">
                    Thiết bị iOS yêu cầu bạn thêm ứng dụng vào Màn hình chính để bật nhận thông báo:
                  </p>
                  <ol className="space-y-3 list-none pl-0">
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        1
                      </span>
                      <span className="pt-0.5">
                        Mở trang web bằng trình duyệt <strong>Safari</strong> trên iPhone/iPad của bạn.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        2
                      </span>
                      <span className="pt-0.5">
                        Chạm vào biểu tượng chia sẻ <Share className="w-4 h-4 inline text-blue-500 mx-0.5" /> ở thanh công cụ dưới Safari.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        3
                      </span>
                      <span className="pt-0.5 flex items-center gap-1.5 flex-wrap">
                        Chọn <strong>Thêm vào MH chính</strong>
                        <span className="inline-flex p-1 border border-brand-outline bg-brand-bg rounded">
                          <i className="hn hn-plus-solid text-xs text-brand-text" />
                        </span>
                        từ danh sách tùy chọn. Sau đó hãy mở ứng dụng để bật lại thông báo nhé!
                      </span>
                    </li>
                  </ol>
                </>
              ) : platform === "android" ? (
                <>
                  <p className="font-semibold text-brand-purple font-pixel text-center mb-2">
                    Trình duyệt di động này không hỗ trợ thông báo trực tiếp. Hãy cài đặt ứng dụng:
                  </p>
                  <ol className="space-y-3 list-none pl-0">
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        1
                      </span>
                      <span className="pt-0.5">
                        Mở trang web này bằng trình duyệt <strong>Google Chrome</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        2
                      </span>
                      <span className="pt-0.5 flex items-center gap-1.5 flex-wrap">
                        Nhấn vào menu <strong>3 chấm</strong>
                        <span className="inline-flex p-1 border border-brand-outline bg-brand-bg rounded">
                          <i className="hn hn-ellipses-vertical-solid text-xs text-brand-text" />
                        </span>
                        ở góc trên bên phải.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        3
                      </span>
                      <span className="pt-0.5">
                        Chọn <strong>Cài đặt ứng dụng</strong> hoặc <strong>Thêm vào Màn hình chính</strong> để bật nhận thông báo nhé!
                      </span>
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="font-semibold text-brand-purple font-pixel text-center mb-2">
                    Trình duyệt của bạn không hỗ trợ tính năng thông báo trực tiếp. Hãy cài đặt ứng dụng:
                  </p>
                  <ol className="space-y-3 list-none pl-0">
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        1
                      </span>
                      <span className="pt-0.5">
                        Sử dụng trình duyệt <strong>Google Chrome</strong> hoặc <strong>Microsoft Edge</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-6 h-6 border-2 border-brand-outline bg-brand-purple text-white font-pixel font-bold rounded-lg flex items-center justify-center text-xs shadow-pixel-sm">
                        2
                      </span>
                      <span className="pt-0.5 flex items-center gap-1.5 flex-wrap">
                        Nhấp vào biểu tượng <strong>Cài đặt</strong>
                        <span className="inline-flex p-1 border border-brand-outline bg-brand-bg rounded">
                          <i className="hn hn-download-alt-solid text-xs text-brand-text" />
                        </span>
                        trên thanh địa chỉ trình duyệt để cài đặt ứng dụng nhé!
                      </span>
                    </li>
                  </ol>
                </>
              )}
            </>
          ) : (
            <>
              <p className="font-semibold text-brand-purple font-pixel text-center mb-2">
                Bạn đã chặn quyền gửi thông báo của 80others trên trình duyệt này:
              </p>
              <div className="bg-brand-bg border-2 border-brand-outline rounded-xl p-3 space-y-2 text-xs">
                <p>
                  <strong>Cách bật lại trên Máy tính:</strong> Bấm vào biểu tượng <strong>Cài đặt/Ổ khóa</strong> cạnh thanh địa chỉ trình duyệt web (ở đầu trang) &rarr; Chuyển trạng thái <strong>Thông báo (Notifications)</strong> sang <strong>Cho phép (Allow)</strong>.
                </p>
                <p>
                  <strong>Cách bật lại trên Điện thoại:</strong> Vào <strong>Cài đặt trang web</strong> của trình duyệt &rarr; <strong>Thông báo</strong> &rarr; Tìm 80others và chọn <strong>Cho phép</strong>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-2.5 border-2 border-brand-outline rounded-xl bg-brand-purple text-white font-pixel font-bold text-xs shadow-pixel-sm transition-all hover:brightness-105 active:translate-y-0.5 active:translate-x-0.5 cursor-pointer"
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
};
