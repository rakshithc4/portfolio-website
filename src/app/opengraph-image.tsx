import { ImageResponse } from "next/og";

// 1200x630 share image in the blueprint style: name, one-liner, bridge line art.
export const alt = "Rakshith Chandra Shekar — SAP ABAP Cloud & BTP Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14284B";
const MUTED = "#5B6B82";
const LINE = "#C9D3DF";
const ACCENT = "#E8590C";
const ACCENT_TEXT = "#B8400A";
const BG = "#F4F6F8";

export default function Image() {
  const bracket = { position: "absolute", width: 28, height: 28, display: "flex" } as const;
  const hangers = [0.15, 0.2, 0.26, 0.32, 0.38, 0.44, 0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.85].map((t) => {
    const x = 90 + 460 * t;
    return <line key={t} x1={x} x2={x} y1={250 - 600 * t + 600 * t * t} y2={190} stroke={INK} strokeWidth={1.5} />;
  });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: INK,
          padding: 64,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* corner brackets */}
        <div style={{ ...bracket, top: 32, left: 32, borderTop: `3px solid ${INK}`, borderLeft: `3px solid ${INK}` }} />
        <div style={{ ...bracket, top: 32, right: 32, borderTop: `3px solid ${INK}`, borderRight: `3px solid ${INK}` }} />
        <div style={{ ...bracket, bottom: 32, left: 32, borderBottom: `3px solid ${INK}`, borderLeft: `3px solid ${INK}` }} />
        <div style={{ ...bracket, bottom: 32, right: 32, borderBottom: `3px solid ${INK}`, borderRight: `3px solid ${INK}` }} />

        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
            <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: ACCENT_TEXT }}>SHEET 01 · INTRODUCTION</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 20, fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
              <span>Rakshith</span>
              <span>Chandra Shekar</span>
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 30, lineHeight: 1.3, color: MUTED }}>
              SAP ABAP Cloud applications that turn business processes into reliable, tested software.
            </div>
          </div>

          {/* bridge line art */}
          <svg width={500} height={266} viewBox="0 0 640 340">
            <path d="M20 290 q 15 -7 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0" fill="none" stroke={MUTED} strokeWidth={1.5} />
            <rect x="52" y="130" width="36" height="160" fill={BG} stroke={INK} strokeWidth={3} />
            <rect x="552" y="130" width="36" height="160" fill={BG} stroke={INK} strokeWidth={3} />
            <line x1="30" x2="610" y1="190" y2="190" stroke={INK} strokeWidth={3} />
            <line x1="30" x2="610" y1="196" y2="196" stroke={INK} strokeWidth={1.5} />
            <path d="M90 250 Q320 -50 550 250" fill="none" stroke={INK} strokeWidth={4} />
            <path d="M90 250 Q320 -20 550 250" fill="none" stroke={INK} strokeWidth={1.5} />
            {hangers}
            <line x1="90" x2="550" y1="314" y2="314" stroke={MUTED} strokeWidth={1.5} />
            <line x1="90" x2="90" y1="306" y2="322" stroke={MUTED} strokeWidth={1.5} />
            <line x1="550" x2="550" y1="306" y2="322" stroke={MUTED} strokeWidth={1.5} />
            <circle cx="70" cy="193" r="9" fill={ACCENT} />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${LINE}`,
            paddingTop: 16,
            fontSize: 20,
            color: MUTED,
            letterSpacing: 1,
          }}
        >
          <span>DWG RCS-001 · BUSINESS → CODE</span>
          <span>SCALE 1:1 · SYDNEY</span>
        </div>
      </div>
    ),
    size,
  );
}
