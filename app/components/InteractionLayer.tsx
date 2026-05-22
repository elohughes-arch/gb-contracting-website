"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function InteractionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollRoot = document.querySelector<HTMLElement>(".site-scroll");
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const resetPageScroll = () => {
      scrollRoot?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    const scrollResetTimers: number[] = [];
    if (!window.location.hash) {
      resetPageScroll();
      [80, 420, 2120].forEach((delay) => {
        scrollResetTimers.push(window.setTimeout(resetPageScroll, delay));
      });
    }

    const counterElements = Array.from(document.querySelectorAll<HTMLElement>("[data-count-to]"));
    const finishCounter = (element: HTMLElement) => {
      element.textContent = element.dataset.countTo ?? element.textContent;
      element.dataset.counted = "true";
    };

    const revealElement = (element: HTMLElement) => {
      element.classList.add("is-visible");
      element.style.opacity = "1";
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        revealElement(element);
      });
      counterElements.forEach((element) => finishCounter(element));
      return;
    }

    const animateCounter = (element: HTMLElement) => {
      if (element.dataset.counted === "true") return;
      const target = Number(element.dataset.countTo ?? "0");
      const start = 1;
      const duration = 2000;
      const startedAt = performance.now();
      element.dataset.counted = "true";

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        element.textContent = `${Math.round(start + (target - start) * eased)}`;
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          element.textContent = `${target}`;
        }
      };

      window.requestAnimationFrame(tick);
    };

    document.body.classList.add("motion-ready");
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealElements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 55, 275)}ms`);
    });

    const revealVisibleNow = () => {
      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          revealElement(element);
        }
      });
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target as HTMLElement);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.24 },
    );

    const counterObserveDelay = document.body.classList.contains("splash-active") ? 2100 : 0;
    const counterObserveTimer = window.setTimeout(() => {
      counterElements.forEach((element) => counterObserver.observe(element));
    }, counterObserveDelay);

    revealVisibleNow();
    const fallback = window.setTimeout(revealVisibleNow, 250);
    const revealAllFallback = window.setTimeout(() => {
      revealElements.forEach((element) => revealElement(element));
    }, 1800);
    const footer = document.querySelector<HTMLElement>(".footer");
    const getScrollTop = () => scrollRoot?.scrollTop ?? window.scrollY;
    const getViewportHeight = () => scrollRoot?.clientHeight ?? window.innerHeight;
    const getScrollHeight = () => scrollRoot?.scrollHeight ?? document.documentElement.scrollHeight;
    const updateScrollState = () => {
      const scrollTop = getScrollTop();
      const viewportHeight = getViewportHeight();
      const scrollRange = Math.max(getScrollHeight() - viewportHeight, 1);
      document.body.style.setProperty("--scroll-progress", `${Math.min(scrollTop / scrollRange, 1).toFixed(4)}`);
      if (footer) {
        const footerStart = getScrollHeight() - viewportHeight - footer.offsetHeight;
        const footerProgress = Math.min(Math.max((scrollTop - footerStart) / Math.max(footer.offsetHeight, 1), 0), 1);
        document.body.style.setProperty("--footer-progress", footerProgress.toFixed(4));
        document.body.classList.toggle("footer-in-view", footerProgress > 0.08);
      }
    };
    updateScrollState();

    const footerWheel = (event: WheelEvent) => {
      if (!footer || !scrollRoot) return;
      scrollRoot.scrollTop += event.deltaY;
      event.preventDefault();
      updateScrollState();
    };
    let footerTouchY = 0;
    const footerTouchStart = (event: TouchEvent) => {
      footerTouchY = event.touches[0]?.clientY ?? 0;
    };
    const footerTouchMove = (event: TouchEvent) => {
      if (!footer || !scrollRoot) return;
      const nextY = event.touches[0]?.clientY ?? footerTouchY;
      scrollRoot.scrollTop += footerTouchY - nextY;
      footerTouchY = nextY;
      event.preventDefault();
      updateScrollState();
    };

    const onScroll = () => {
      revealVisibleNow();
      updateScrollState();
    };
    scrollRoot?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);
    footer?.addEventListener("wheel", footerWheel, { passive: false });
    footer?.addEventListener("touchstart", footerTouchStart, { passive: true });
    footer?.addEventListener("touchmove", footerTouchMove, { passive: false });

    const hero = document.querySelector<HTMLElement>(".hero");
    const heroPointerMove = (event: Event) => {
      if (!(event instanceof PointerEvent) || !hero) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      hero.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };
    hero?.addEventListener("pointermove", heroPointerMove);

    const tiltElements = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const disposers = tiltElements.map((element) => {
      const move = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
        element.style.setProperty("--pointer-x", `${((x + 0.5) * 100).toFixed(1)}%`);
        element.style.setProperty("--pointer-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      };
      const leave = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
        element.style.setProperty("--pointer-x", "50%");
        element.style.setProperty("--pointer-y", "0%");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      document.body.classList.remove("motion-ready");
      document.body.classList.remove("footer-in-view");
      document.body.style.removeProperty("--footer-progress");
      document.body.style.removeProperty("--scroll-progress");
      window.clearTimeout(fallback);
      window.clearTimeout(revealAllFallback);
      window.clearTimeout(counterObserveTimer);
      scrollResetTimers.forEach((timer) => window.clearTimeout(timer));
      scrollRoot?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
      footer?.removeEventListener("wheel", footerWheel);
      footer?.removeEventListener("touchstart", footerTouchStart);
      footer?.removeEventListener("touchmove", footerTouchMove);
      revealObserver.disconnect();
      counterObserver.disconnect();
      hero?.removeEventListener("pointermove", heroPointerMove);
      disposers.forEach((dispose) => dispose());
    };
  }, [pathname]);

  return null;
}
