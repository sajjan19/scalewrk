/*
  Smoothly scroll a sideways row to `left` (px) with an ease-in-out curve.
  Used by the carousel arrows and dots. The row's snapping is paused while it glides, so the
  browser doesn't fight the animation, then turned back on at the end.
  People who turn off motion jump straight there.
*/
const DURATION = 550; // ms

export function glideTo(row: HTMLElement, left: number) {
  const max = row.scrollWidth - row.clientWidth;
  const target = Math.max(0, Math.min(max, left));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    row.scrollLeft = target;
    return;
  }
  const from = row.scrollLeft;
  const distance = target - from;
  if (Math.abs(distance) < 1) return;

  // Cancel a glide that's still running on this row
  const state = row as HTMLElement & { _glide?: number };
  if (state._glide) cancelAnimationFrame(state._glide);
  const snap = row.style.scrollSnapType;
  row.style.scrollSnapType = "none";

  const start = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    row.scrollLeft = from + distance * ease(t);
    if (t < 1) state._glide = requestAnimationFrame(step);
    else {
      state._glide = 0;
      row.style.scrollSnapType = snap;
    }
  };
  state._glide = requestAnimationFrame(step);
}
