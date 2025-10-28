import React, { useEffect, useRef } from "react";


export default function MagnetLines({
    lines = 6,
    color = "#AAAAAA",
    strength = 0.12,
    spacing = "12px",
    height = "2px",
    width = "100%",
    className = "",
}) {
    const wrapRef = useRef(null);
    const rafRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        let bounds = wrap.getBoundingClientRect();

        function onResize() {
            bounds = wrap.getBoundingClientRect();
        }

        function onMove(e) {
            posRef.current = { x: e.clientX, y: e.clientY };
            
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(applyTransforms);
            }
        }

        function applyTransforms() {
            rafRef.current = null;
            const { x, y } = posRef.current;

            
            Array.from(wrap.children).forEach((child, idx) => {
                const rect = child.getBoundingClientRect();
                
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = x - cx;
                const dy = y - cy;

                
                const damp = 1 - idx / Math.max(1, lines);
                const tx = dx * strength * damp;
                const ty = dy * strength * damp * 0.15; // small vertical bias

                child.style.transform = `translate(${tx}px, ${ty}px)`;
            });
        }

        window.addEventListener("mousemove", onMove);
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("resize", onResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [lines, strength]);

    const lineStyle = {
        height,
        width,
        maxWidth: "900px",
        background: color,
        transition: "transform 220ms cubic-bezier(.2,.9,.2,1)",
        borderRadius: "999px",
        willChange: "transform",
    };

    return (
        <div
            ref={wrapRef}
            className={className}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing,
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 12px",
                touchAction: "none",
            }}
        >
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} style={lineStyle} aria-hidden />
            ))}
        </div>
    );
}
