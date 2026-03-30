import { useRef, useEffect } from "react";
import "../assets/scrollbar.css";

const ScrollBar = () => {
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let current = 0;
    let target = 0;
    let timeout: number;
    let isScrolling: Boolean = false;

    const lerp = (a: number, b: number, t: number) => {
      return a + (b - a) * t;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;

      target = docHeight > 0 ? scrollTop / docHeight : 0;

      isScrolling = true;

      if (scrollbarRef.current) {
        scrollbarRef.current.classList.add("active");
      }

      clearTimeout(timeout);

      timeout = window.setTimeout(() => {
        isScrolling = false;

        if (scrollbarRef.current) {
          scrollbarRef.current.classList.remove("active");
        }
      }, 800);
    };

    const animate = () => {
      if (isScrolling || Math.abs(current - target) > 0.001) {
        current = lerp(current, target, 0.1);

        if (thumbRef.current) {
          thumbRef.current.style.transform = `scaleY(${current})`;
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scrollbar" ref={scrollbarRef}>
      <div className="thumb" ref={thumbRef}></div>
    </div>
  );
};

export default ScrollBar;
