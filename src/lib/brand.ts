// Shape of the "S" ribbon mark (192 × 274 units), traced from the brand logo.
export const markViewBox = "0 0 192 274";
export const markPoints = "192,0 192,60 80,105 192,145 192,205 0,274 0,212 107,175 0,136 0,76";

// Standalone SVG string, used by the favicon and social preview images.
export const markSvg = (size = 274) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${markViewBox}" height="${size}" width="${Math.round((size * 192) / 274)}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a2ff5"/><stop offset="1" stop-color="#0d6efd"/></linearGradient></defs><polygon points="${markPoints}" fill="url(#g)"/></svg>`;

export const markDataUri = (size?: number) =>
  `data:image/svg+xml;base64,${Buffer.from(markSvg(size)).toString("base64")}`;
