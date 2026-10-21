/*
  A few shooting stars for the Home hero: a purple-to-blue streak with a glowing head that shoots
  diagonally (top right to bottom left) every so often. Each has its own spot, timing and length,
  so they never all fire at once. Styles: .shooting-star in globals.css. Off for people who turn off motion.
  The parent needs `relative overflow-hidden`.
*/
// Long cycles, so only one crosses every several seconds
const stars = [
  { top: "8%", left: "40%", delay: "3s", duration: "21s", length: 120 },
  { top: "4%", left: "80%", delay: "10s", duration: "24s", length: 140 },
  { top: "28%", left: "96%", delay: "17s", duration: "22s", length: 110 },
];

export function ShootingStars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="shooting-star"
          style={{ top: s.top, left: s.left, width: s.length, animationDelay: s.delay, animationDuration: s.duration }}
        />
      ))}
    </div>
  );
}
