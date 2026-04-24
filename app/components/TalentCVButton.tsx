"use client";

interface TalentCVData {
    firstName: string;
    lastName: string;
    specialty: string | null;
    age: number | null;
    height: string | null;
    eyeColor: string | null;
    hairColor: string | null;
    gender: string | null;
    languages: string[];
    skills: string[];
    description: string | null;
    photoUrl: string | null;
    projects: Array<{
        id: string;
        title: string;
        type: string | null;
        year: number | null;
        role?: string | null;
    }>;
}

interface Props {
    talent: TalentCVData;
}

export default function TalentCVButton({ talent }: Props) {
    const handleDownload = async () => {
        const { jsPDF } = await import("jspdf");

        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

        const W = 210;
        const H = 297;
        const marginX = 20;
        const contentW = W - marginX * 2;

        // ─── Colors ───
        const BLACK = [10, 10, 10] as const;
        const GREY = [154, 154, 154] as const;
        const LIGHT = [230, 230, 230] as const;

        let y = 0;

        // ─── Helper functions ───
        const line = (color = LIGHT) => {
            doc.setDrawColor(...color);
            doc.setLineWidth(0.3);
            doc.line(marginX, y, W - marginX, y);
        };

        const text = (
            str: string,
            x: number,
            size: number,
            color: readonly [number, number, number] = BLACK,
            style: "normal" | "bold" | "italic" = "normal",
            align: "left" | "center" | "right" = "left"
        ) => {
            doc.setFontSize(size);
            doc.setTextColor(...color);
            doc.setFont("helvetica", style);
            doc.text(str, x, y, { align });
        };

        // ─── Try to embed photo ───
        let photoEmbedded = false;
        if (talent.photoUrl) {
            try {
                const res = await fetch(talent.photoUrl);
                const blob = await res.blob();
                const reader = new FileReader();
                const dataUrl = await new Promise<string>((resolve, reject) => {
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                // Get actual image dimensions
                const { naturalW, naturalH } = await new Promise<{ naturalW: number; naturalH: number }>((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve({ naturalW: img.naturalWidth, naturalH: img.naturalHeight });
                    img.onerror = () => resolve({ naturalW: 3, naturalH: 4 }); // fallback ratio
                    img.src = dataUrl;
                });

                // Photo must fit between the two horizontal lines: y=32 → y=71
                const boxTop = 32;
                const boxBot = 71;
                const boxW = 55;
                const boxH = boxBot - boxTop; // 39mm
                const ratio = naturalW / naturalH;
                let imgW: number, imgH: number;
                if (ratio > boxW / boxH) {
                    // wider than box → constrain by width
                    imgW = boxW;
                    imgH = boxW / ratio;
                } else {
                    // taller than box → constrain by height
                    imgH = boxH;
                    imgW = boxH * ratio;
                }
                // Center inside the box
                const imgX = W - marginX - boxW + (boxW - imgW) / 2;
                const imgY = boxTop + (boxH - imgH) / 2;
                doc.addImage(dataUrl, "JPEG", imgX, imgY, imgW, imgH);
                photoEmbedded = true;
            } catch {
                // Photo not accessible (CORS etc.) — skip it
            }
        }

        // ─── Header ───
        y = 20;
        text("ICONIK AGENCY", marginX, 7, GREY, "normal");

        y = 30;
        line();

        // ─── Name ───
        y = 44;
        const nameRightBound = photoEmbedded ? W - marginX - 60 : W - marginX;
        doc.setFontSize(32);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...BLACK);
        doc.text(talent.firstName.toUpperCase(), marginX, y);

        y = 54;
        doc.setFontSize(32);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...GREY);
        doc.text(talent.lastName.toUpperCase(), marginX, y);

        // ─── Specialty + age ───
        y = 65;
        const meta: string[] = [];
        if (talent.specialty) meta.push(talent.specialty.toUpperCase());
        if (talent.age) meta.push(`${talent.age} ANS`);
        if (meta.length > 0) {
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...GREY);
            doc.text(meta.join("  ·  "), marginX, y, { charSpace: 1 });
        }

        y = 73;
        line();

        // ─── Description ───
        if (talent.description) {
            y = 82;
            doc.setFontSize(9.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...BLACK);
            const maxDescW = photoEmbedded ? contentW - 62 : contentW;
            const lines = doc.splitTextToSize(talent.description, maxDescW);
            const maxLines = photoEmbedded ? 8 : 6;
            doc.text(lines.slice(0, maxLines), marginX, y);
            y += Math.min(lines.length, maxLines) * 5.5 + 6;
        } else {
            y = 82;
        }

        // ─── Physical details (2-col grid) ───
        const details: Array<{ label: string; value: string }> = [];
        if (talent.age) details.push({ label: "ÂGE", value: `${talent.age} ans` });
        if (talent.height) details.push({ label: "TAILLE", value: talent.height });
        if (talent.eyeColor) details.push({ label: "YEUX", value: talent.eyeColor });
        if (talent.hairColor) details.push({ label: "CHEVEUX", value: talent.hairColor });
        if (talent.gender) details.push({ label: "GENRE", value: talent.gender });

        if (details.length > 0) {
            line();
            y += 8;
            const colW = contentW / 2;
            details.forEach((d, i) => {
                const col = i % 2;
                const row = Math.floor(i / 2);
                const dx = marginX + col * colW;
                const dy = y + row * 12;

                doc.setFontSize(6.5);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(...GREY);
                doc.text(d.label, dx, dy, { charSpace: 0.8 });

                doc.setFontSize(9);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(...BLACK);
                doc.text(d.value, dx, dy + 4.5);
            });
            const rows = Math.ceil(details.length / 2);
            y += rows * 12 + 4;
        }

        // ─── Languages ───
        if (talent.languages?.length > 0) {
            line();
            y += 8;
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...GREY);
            doc.text("LANGUES", marginX, y, { charSpace: 0.8 });
            y += 5;
            doc.setFontSize(9);
            doc.setTextColor(...BLACK);
            doc.text(talent.languages.join("  ·  "), marginX, y);
            y += 10;
        }

        // ─── Skills ───
        if (talent.skills?.length > 0) {
            line();
            y += 8;
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...GREY);
            doc.text("COMPÉTENCES", marginX, y, { charSpace: 0.8 });
            y += 6;

            // Wrap skills into rows
            const skillLines: string[][] = [[]];
            let currentLineW = 0;
            const maxLineW = contentW;
            const avgCharW = 2.3; // approx mm per char at 9pt

            talent.skills.forEach((skill) => {
                const skillW = skill.length * avgCharW + 6;
                if (currentLineW + skillW > maxLineW && skillLines[skillLines.length - 1].length > 0) {
                    skillLines.push([]);
                    currentLineW = 0;
                }
                skillLines[skillLines.length - 1].push(skill);
                currentLineW += skillW;
            });

            doc.setFontSize(8.5);
            doc.setTextColor(...BLACK);
            skillLines.forEach((row) => {
                doc.text(row.join("  ·  "), marginX, y);
                y += 6;
            });
            y += 4;
        }

        // ─── Projects ───
        if (talent.projects?.length > 0) {
            line();
            y += 8;
            doc.setFontSize(6.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...GREY);
            doc.text("PROJETS", marginX, y, { charSpace: 0.8 });
            y += 6;

            talent.projects.forEach((project) => {
                if (y > H - 25) return; // stop before footer

                doc.setFontSize(9);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(...BLACK);

                let projectLine = `— ${project.title}`;
                const meta: string[] = [];
                if (project.role) meta.push(project.role);
                if (project.type) meta.push(project.type);
                if (project.year) meta.push(String(project.year));
                if (meta.length > 0) {
                    doc.text(projectLine, marginX, y);
                    doc.setTextColor(...GREY);
                    doc.setFontSize(7.5);
                    const metaStr = `  ${meta.join(" · ")}`;
                    const projectLineW = doc.getTextWidth(projectLine);
                    doc.text(metaStr, marginX + projectLineW, y);
                } else {
                    doc.text(projectLine, marginX, y);
                }
                y += 6;
            });
            y += 2;
        }

        // ─── Footer ───
        y = H - 14;
        line();
        y += 5;
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...GREY);
        doc.text("ICONIK AGENCY  ·  www.iconikagency.fr  ·  hello@iconikagency.com", W / 2, y, { align: "center", charSpace: 0.5 });

        // ─── Save ───
        const fileName = `${talent.firstName.toLowerCase()}-${talent.lastName.toLowerCase()}-iconik.pdf`;
        doc.save(fileName);
    };

    return (
        <button
            onClick={handleDownload}
            className="btn-outline w-fit flex items-center gap-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Télécharger le CV</span>
        </button>
    );
}
