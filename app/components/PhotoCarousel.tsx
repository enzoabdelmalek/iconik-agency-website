"use client";

import { useState } from "react";

export default function PhotoCarousel({ photos, name }: { photos: string[]; name: string }) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
    const next = () => setCurrent(i => (i + 1) % photos.length);

    if (photos.length === 0) return null;

    return (
        <div className="relative w-full">
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <img
                    src={photos[current]}
                    alt={`${name} — ${current + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs"
                    style={{ background: "rgba(0,0,0,0.5)", color: "#ffffff" }}>
                    {current + 1} / {photos.length}
                </div>

                {/* Arrows */}
                {photos.length > 1 && (
                    <>
                        <button onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                            style={{ background: "rgba(0,0,0,0.4)", color: "#ffffff" }}
                            aria-label="Photo précédente">
                            ←
                        </button>
                        <button onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                            style={{ background: "rgba(0,0,0,0.4)", color: "#ffffff" }}
                            aria-label="Photo suivante">
                            →
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {photos.map((url, i) => (
                        <button key={i} onClick={() => setCurrent(i)}
                            className="shrink-0 w-16 h-16 overflow-hidden transition-all"
                            style={{ opacity: current === i ? 1 : 0.4, outline: current === i ? "2px solid white" : "none" }}>
                            <img src={url} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
