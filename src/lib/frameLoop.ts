/**
 * Calls `draw` on every animation frame while `el` is on screen. Off screen there are no frames at all, and nothing
 * reads the layout: an observer tells us when it comes and goes. Returns the cleanup.
 */
export function runWhileVisible(el: Element, draw: (now: number) => void): () => void {
  let frame = 0;
  const loop = (now: number) => {
    draw(now);
    frame = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(frame);
    if (entry?.isIntersecting) frame = requestAnimationFrame(loop);
  });
  io.observe(el);
  return () => {
    io.disconnect();
    cancelAnimationFrame(frame);
  };
}
