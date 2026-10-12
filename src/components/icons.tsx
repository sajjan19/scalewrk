// Custom icons drawn to match the lucide-react outline style (24×24, round strokes).

type IconProps = { className?: string; strokeWidth?: number };

// One boxing glove, drawn in a 24×24 box.
// `cover` fills the glove so it hides anything behind it (used for the front glove).
function GlovePaths({ cover }: { cover?: string }) {
  return (
    <>
      {/* rounded mitt */}
      <path
        vectorEffect="non-scaling-stroke"
        fill={cover ?? "none"}
        d="M7.5 14.5C5.6 13.4 4.5 11.4 4.5 9 4.5 5.4 7.4 3 11 3h2.5C17.6 3 20 5.7 20 9.5c0 3.4-2.1 5.7-5 6"
      />
      {/* curled thumb */}
      <path vectorEffect="non-scaling-stroke" d="M11 9.5c-1.9 0-3 1.1-3 2.6 0 1.4 1.1 2.4 2.7 2.4h4.3" />
      {/* cuff */}
      <path vectorEffect="non-scaling-stroke" fill={cover ?? "none"} d="M7.5 14.5V19a2 2 0 0 0 2 2h4.5a1.5 1.5 0 0 0 1.5-1.5v-4" />
      <path vectorEffect="non-scaling-stroke" d="M7.5 17.5h8" />
    </>
  );
}

// A pair of boxing gloves, one in front of the other (used for Muay Thai).
// The front glove is filled with the tag background so the back glove's lines don't show through.
export function BoxingGloves({ className = "h-5 w-5", strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform="translate(1 1) scale(0.66)">
        <GlovePaths />
      </g>
      <g transform="translate(8.5 7.2) scale(0.66)">
        <GlovePaths cover="var(--color-brand-soft)" />
      </g>
    </svg>
  );
}

export function SoccerBall({ className = "h-5 w-5", strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      {/* center pentagon */}
      <path d="M12 7.5l3.8 2.8-1.5 4.5H9.7l-1.5-4.5z" />
      {/* seams to the edge */}
      <path d="M12 7.5V3M15.8 10.3l4.5-1.4M14.3 14.8l2.8 4M9.7 14.8l-2.8 4M8.2 10.3l-4.5-1.4" />
    </svg>
  );
}
