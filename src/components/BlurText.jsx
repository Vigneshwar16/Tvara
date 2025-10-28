import React, { useState, useMemo } from "react";


export default function BlurText({
    text = "Hello, world",
    blurAmount = "6px",
    fontSize = "2rem",
    color = "#fff",
    revealed = false,
    className = "",
}) {
    const [hovered, setHovered] = useState(false);
    const isRevealed = revealed || hovered;

    const style = useMemo(
        () => ({
            filter: isRevealed ? "blur(0px)" : `blur(${blurAmount})`,
            transition: "filter 360ms cubic-bezier(.2,.8,.2,1), opacity 200ms",
            fontSize,
            color,
            WebkitTapHighlightColor: "transparent",
            cursor: "default",
            display: "inline-block",
            willChange: "filter",
        }),
        [isRevealed, blurAmount, fontSize, color]
    );

    return (
        <span
            role="text"
            aria-label={typeof text === "string" ? text : undefined}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            tabIndex={0}
            className={className}
            style={style}
        >
            {text}
        </span>
    );
}
