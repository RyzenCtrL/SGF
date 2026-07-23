import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#b5e024",
          borderRadius: 7,
          color: "#0e0f10",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        SGF
      </div>
    ),
    { ...size }
  );
}
