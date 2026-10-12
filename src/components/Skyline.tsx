/*
  New York skyline drawn in the logo gradient (an original drawing, not a photo).
  Landmarks: One World Trade Center (left), Empire State Building (middle), Chrysler Building (right).
  Each building is [x, width, height] on a 1200 x 220 canvas, with the ground at the bottom.
*/

const back: [number, number, number][] = [
  [0, 70, 110], [60, 50, 150], [230, 60, 120], [300, 45, 160], [420, 70, 130], [500, 50, 100],
  [660, 60, 140], [880, 55, 150], [950, 70, 110], [1040, 50, 170], [1100, 60, 120], [1160, 40, 140],
];

const front: [number, number, number][] = [
  [0, 55, 52], [50, 40, 72], [95, 40, 45], [210, 50, 64], [265, 35, 90], [305, 60, 56], [370, 45, 76],
  [420, 55, 48], [480, 40, 68], [525, 40, 44], [645, 45, 68], [690, 45, 52], [740, 40, 40], [826, 50, 60],
  [880, 45, 84], [930, 60, 52], [995, 45, 72], [1045, 55, 45], [1105, 40, 64], [1150, 50, 52],
];

export function NewYorkSkyline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 220" className={`block w-full ${className}`} role="img" aria-label="Illustration of the New York skyline">
      <defs>
        <linearGradient id="ny-skyline" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7a2ff5" />
          <stop offset="1" stopColor="#0d6efd" />
        </linearGradient>
      </defs>
      <g fill="url(#ny-skyline)">
        {/* Buildings in the distance */}
        <g opacity="0.18">
          {back.map(([x, w, h]) => (
            <rect key={x} x={x} y={220 - h} width={w} height={h} />
          ))}
        </g>

        {/* Buildings up front */}
        {front.map(([x, w, h]) => (
          <rect key={x} x={x} y={220 - h} width={w} height={h} />
        ))}

        {/* One World Trade Center */}
        <polygon points="135,220 135,178 150,62 190,62 205,178 205,220" />
        <rect x="169" y="14" width="2" height="48" />

        {/* Empire State Building */}
        <path d="M560 220V140h10v-30h12V70h8V55h5V40h10v15h5v15h8v40h12v30h10v80z" />
        <rect x="599" y="8" width="2" height="32" />

        {/* Chrysler Building */}
        <polygon points="778,220 778,92 782,92 786,78 789,78 792,66 794,66 797,54 798,54 800,40 802,54 803,54 806,66 808,66 811,78 814,78 818,92 822,92 822,220" />
        <rect x="799" y="10" width="2" height="32" />
      </g>
    </svg>
  );
}
