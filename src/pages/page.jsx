import React, { useState } from "react";
import BlurText from "../components/BlurText";
import MagnetLines from "../components/MagnetLines";

export default function Page() {
    const [revealAll, setRevealAll] = useState(false);

    return (
        <main style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b1020",
            color: "#fff",
            padding: "48px"
        }}>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ marginBottom: "16px" }}>
                    <BlurText text="Tactile UI — React Bits" fontSize="2.8rem" blurAmount="8px" revealed={revealAll} />
                </h1>

                <p style={{ marginBottom: "10px", color: "#cfd8e3" }}>
                    Hover the text, or toggle reveal.
                </p>

                <button
                    onClick={() => setRevealAll((s) => !s)}
                    style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer",
                        background: "#1f6feb",
                        color: "#fff"
                    }}
                >
                    {revealAll ? "Hide" : "Reveal"}
                </button>
            </div>

            <section style={{ width: "100%", maxWidth: 980 }}>
                <MagnetLines lines={8} color="#394b6a" strength={0.08} spacing="18px" height="3px" />
            </section>

            <section style={{
                marginTop: 20,
                padding: 18,
                borderRadius: 12,
                background: "#07102688",
                width: "100%",
                maxWidth: 900,
            }}>
                <h2>Gemini (placeholder)</h2>
                <p style={{ color: "#c2d3ff" }}>
                    Replace this with your Gemini integration component. For now this is a placeholder showing where AI responses or widgets will go.
                </p>
            </section>
        </main>
    );
}
