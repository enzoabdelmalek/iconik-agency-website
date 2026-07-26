"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortToggle({ current }: { current: "desc" | "asc" }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const toggle = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tri", current === "desc" ? "asc" : "desc");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase border border-border px-4 py-2 hover:border-foreground transition-colors duration-200"
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {current === "desc" ? (
                    // Flèche bas = du plus récent au plus ancien → cliquer passe en asc
                    <path d="M12 5v14M5 12l7 7 7-7" />
                ) : (
                    // Flèche haut = du plus ancien au plus récent → cliquer passe en desc
                    <path d="M12 19V5M5 12l7-7 7 7" />
                )}
            </svg>
            {current === "desc" ? "Plus récent d'abord" : "Plus ancien d'abord"}
        </button>
    );
}
