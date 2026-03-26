import { useEffect, useCallback } from 'react';

/**
 * Attaches auto-resize behaviour to a textarea ref.
 * Pass the ref and the current value; the textarea grows with content
 * and never shows an internal scrollbar.
 *
 * @param {React.RefObject} ref   - ref attached to the <textarea>
 * @param {string}          value - current textarea value (triggers recalc)
 * @param {number}          [maxHeight] - optional cap in px (default: none)
 */
export function useAutoResize(ref, value, maxHeight) {
  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const next = el.scrollHeight;
    el.style.height = (maxHeight ? Math.min(next, maxHeight) : next) + 'px';
    el.style.overflowY = maxHeight && next > maxHeight ? 'auto' : 'hidden';
  }, [ref, maxHeight]);

  useEffect(() => {
    resize();
  }, [value, resize]);
}
