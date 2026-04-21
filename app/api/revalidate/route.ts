import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const secret = req.headers.get("x-revalidate-secret");
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    revalidatePath("/");
    revalidatePath("/projets");
    revalidatePath("/projets/[id]", "page");
    revalidatePath("/talents/[slug]", "page");

    return NextResponse.json({ revalidated: true });
}
