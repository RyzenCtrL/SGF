import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Street Gym Factory — уличные спортивные площадки под ключ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0f10",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 104,
              height: 104,
              borderRadius: 22,
              background: "#b5e024",
              color: "#0e0f10",
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            SGF
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#f4f5f5", letterSpacing: -1 }}>
            Street Gym Factory
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 30, color: "#9ba1a3" }}>
          Уличные спортивные площадки под ключ
        </div>
      </div>
    ),
    { ...size }
  );
}
