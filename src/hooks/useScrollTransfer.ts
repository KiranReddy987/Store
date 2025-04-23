import { useEffect } from 'react';

export const useScrollTransfer = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;

      if ((scrollingDown && atBottom) || (!scrollingDown && atTop)) {
        // Allow parent to scroll
        e.preventDefault();
        e.stopPropagation();
        el.parentElement?.scrollBy({ top: e.deltaY });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [ref]);
};
