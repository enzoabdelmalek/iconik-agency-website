"use client";

import { useState } from "react";

export default function PhotoCarousel({ photos, name, initials }: { photos: string[]; name: string; initials?: string }) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
    const next = () => setCurrent(i => (i + 1) % photos.length);

    if (photos.length === 0) {
        return (
            <div className="photo-placeholder aspect-[3/4] w-full flex items-center justify-center">
                <span className="relative z-10 text-5xl md:text-6xl">{initials}</span>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <img
                    src={photos[current]}
                    alt={`${name} — ${current + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Counter */}
                <div className="carousel-counter">
                    {current + 1} / {photos.length}
                </div>

                {/* Arrows */}
                {photos.length > 1 && (
                    <>
                        <button onClick={prev} className="carousel-btn carousel-btn-prev" aria-label="Photo précédente">
                            ←
                        </button>
                        <button onClick={next} className="carousel-btn carousel-btn-next" aria-label="Photo suivante">
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
                            className={`carousel-thumb${current === i ? " active" : ""}`}>
                            <img src={url} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
