"use client";

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("gb-splash-seen")) return;

    document.body.classList.add("splash-active");
    sessionStorage.setItem("gb-splash-seen", "true");
    setVisible(true);
    const timeout = window.setTimeout(() => {
      document.body.classList.remove("splash-active");
      setVisible(false);
    }, 2800);
    return () => {
      document.body.classList.remove("splash-active");
      window.clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-mark">
        <span>GB</span>
      </div>
    </div>
  );
}
