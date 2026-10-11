import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { markDataUri } from "./brand";

/*
  Social preview images (the card shown when a link is shared on LinkedIn, X, Slack, iMessage).
  Each page has a tiny opengraph-image.tsx that calls ogImage() with its own headline.
*/

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");
const semibold = readFile(join(fontDir, "Geist-SemiBold.ttf"));
const medium = readFile(join(fontDir, "Geist-Medium.ttf"));

export async function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0b1020",
          backgroundImage:
            "radial-gradient(circle at 92% 0%, rgba(122,47,245,0.55), rgba(11,16,32,0) 45%), radial-gradient(circle at 100% 100%, rgba(13,110,253,0.35), rgba(11,16,32,0) 40%)",
          color: "white",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri(64)} height={64} width={45} alt="" />
          <div style={{ display: "flex", fontSize: 40, letterSpacing: -1 }}>
            <span style={{ fontWeight: 600 }}>scalewrk</span>
            <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.6)", marginLeft: 12 }}>talent</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#a5b4fc", marginBottom: 20 }}>{eyebrow}</div>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1056, whiteSpace: "pre-wrap" }}>{title}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28, fontWeight: 500 }}>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>scalewrk.ai</span>
          <span
            style={{
              display: "flex",
              backgroundColor: "white",
              color: "#0b1020",
              borderRadius: 14,
              padding: "14px 26px",
            }}
          >
            Book a call →
          </span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: await semibold, weight: 600, style: "normal" },
        { name: "Geist", data: await medium, weight: 500, style: "normal" },
      ],
    },
  );
}
