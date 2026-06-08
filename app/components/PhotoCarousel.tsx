"use client";

import { useState } from "react";

export default function PhotoCarousel({ photos, name, initials }: { photos: string[]; name: string; initials?: string }) {
    const [current, setCurrent] = useState(0);
    const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

    const validPhotos = photos.filter(url => !failedUrls.has(url));
    const onImgError = (url: string) => setFailedUrls(prev => new Set(prev).add(url));

    const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
    const next = () => setCurrent(i => (i + 1) % photos.length);

    const displayIndex = Math.min(current, Math.max(validPhotos.length - 1, 0));

    if (validPhotos.length === 0) {
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
                    src={validPhotos[displayIndex]}
                    alt={`${name} - photo ${displayIndex + 1} sur ${validPhotos.length}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={() => onImgError(validPhotos[displayIndex])}
                />

                {/* Counter */}
                <div className="carousel-counter">
                    {displayIndex + 1} / {validPhotos.length}
                </div>

                {/* Arrows */}
                {validPhotos.length > 1 && (
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
            {validPhotos.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {validPhotos.map((url, i) => (
                        <button key={url} onClick={() => setCurrent(i)}
                            className={`carousel-thumb${displayIndex === i ? " active" : ""}`}>
                            <img src={url} alt={`${name} - vignette ${i + 1}`} className="w-full h-full object-cover"
                                onError={() => onImgError(url)} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
