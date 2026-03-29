"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface AnimateOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimateOnScroll({
    children,
    className = "",
    delay = 0,
}: AnimateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const delayClass = delay > 0 ? `delay-${delay}` : "";

    return (
        <div ref={ref} className={`animate-on-scroll ${delayClass} ${className}`}>
            {children}
        </div>
    );
}
