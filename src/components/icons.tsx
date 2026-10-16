// Custom icons drawn to match the lucide-react outline style (24×24, round strokes).

type IconProps = { className?: string; strokeWidth?: number };

// A Muay Thai fighter throwing a high kick. Solid pictogram so it reads at small sizes.
export function MuayThaiFighter({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* head */}
      <circle cx="8.4" cy="4.2" r="2.2" fill="currentColor" stroke="none" />
      {/* body */}
      <path d="M9.3 7.6 11.2 12.6" strokeWidth={3.2} />
      {/* guard arm and glove */}
      <path d="M9.6 8.3 7.3 9.8 6.6 7.6" strokeWidth={2.1} />
      <circle cx="6.4" cy="6.7" r="1.6" fill="currentColor" stroke="none" />
      {/* back arm swinging for balance */}
      <path d="M9.8 8.8 7.2 11.6 5 12.4" strokeWidth={2.1} />
      <circle cx="4.4" cy="12.6" r="1.5" fill="currentColor" stroke="none" />
      {/* kicking leg */}
      <path d="M11.2 12.6 16.4 10.6 21.2 8.6" strokeWidth={2.4} />
      {/* standing leg */}
      <path d="M11.2 12.6 10.6 17.4 11.6 21.6" strokeWidth={2.4} />
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

// A martial arts belt tied in a knot, with the two ends hanging down (Brazilian Jiu-Jitsu)
export function JiuJitsuBelt({ className = "h-5 w-5", strokeWidth = 1.75 }: IconProps) {
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
      {/* belt around the waist, left and right of the knot */}
      <path d="M2.5 6.5h7v4h-7zM14.5 6.5h7v4h-7z" />
      {/* knot */}
      <rect x="9.5" y="5" width="5" height="7" rx="1" />
      {/* hanging ends */}
      <path d="M10.6 12 7.2 20.5h2.9l1.9-5.2M13.4 12l3.4 8.5h-2.9L12 15.3" />
    </svg>
  );
}
