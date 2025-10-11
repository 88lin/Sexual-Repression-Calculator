import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  if (typeof window === "undefined") return; // SSR 保护
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const show = window.scrollY > 200;
        // 避免无意义的重复 setState
        setVisible(prev => (prev !== show ? show : prev));
        ticking = false;
      });
      ticking = true;
    }
  };

  // 第一次挂载时就同步一次，避免刷新后已在底部却仍不显示
  handleScroll();

  // 被动监听提升滚动性能
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      // 固定右下角，层级极高，保证覆盖掉评测页面内旧按钮
      className={`fixed bottom-16 right-6 z-[9999] transition-[opacity,transform] duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <button
        onClick={scrollToTop}
        aria-label="回到顶部"
        className="w-12 h-12 rounded-full
                   bg-white/15 text-white
                   backdrop-blur-xl border border-white/25
                   shadow-lg hover:shadow-xl
                   flex items-center justify-center
                   transition-transform duration-300 ease-out
                   hover:scale-110 active:scale-95
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                   motion-reduce:transition-none"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
