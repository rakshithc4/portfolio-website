// Shared geometry for the hero bridge (viewBox 640 x 340).
export const DECK_Y = 190;

// Arch is a quadratic curve: M90 250 Q320 -50 550 250.  x = 90+460t, y = 250-600t+600t^2.
export const archY = (t: number) => 250 - 600 * t + 600 * t * t;
export const HANGER_TS = [0.15, 0.2, 0.26, 0.32, 0.38, 0.44, 0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.85];

// The five stages. (x, y) is the numbered circle, (tx, ty) is where its leader meets the bridge.
export const CALLOUTS = [
  { n: 1, x: 70, y: 40, tx: 70, ty: 130, label: "BUSINESS PROCESS", side: "r" },
  { n: 2, x: 148, y: 72, tx: 182, ty: archY(0.2), label: "CDS DATA MODEL", side: "r" },
  { n: 3, x: 290, y: 40, tx: 290, ty: archY(0.435), label: "RAP BUSINESS OBJECT", side: "r" },
  { n: 4, x: 450, y: 72, tx: 450, ty: archY(0.783), label: "ODATA V4 SERVICE", side: "l" },
  { n: 5, x: 585, y: 40, tx: 585, ty: 130, label: "UI · FIORI", side: "l" },
] as const;

/** Where the request dot sits on the deck when it "reaches" each stage. */
export const STAGE_X = [70, 182, 290, 450, 585] as const;
