import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Iconik Agency — Agence de Jeunes Comédiens";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
                    background: "#0a0a0a",
                    color: "#ffffff",
                    fontFamily: "Georgia, serif",
                }}
            >
                <div style={{ fontSize: 96, letterSpacing: "0.06em" }}>ICONIK</div>
                <div
                    style={{
                        width: 80,
                        height: 1,
                        background: "rgba(255,255,255,0.3)",
                        margin: "24px 0",
                    }}
                />
                <div
                    style={{
                        fontSize: 20,
                        letterSpacing: "0.2em",
                        opacity: 0.45,
                        textTransform: "uppercase",
                        fontFamily: "system-ui, sans-serif",
                        fontWeight: 400,
                    }}
                >
                    Agence de Jeunes Comédiens
                </div>
            </div>
        ),
        { ...size }
    );
}
