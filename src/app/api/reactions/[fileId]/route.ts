import { updateReaction } from "@/lib/drive";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await context.params; // ✅ must await

  try {
    const { reaction } = await req.json();

    const validReactions = ["felt", "alone", "understand"];
    if (!validReactions.includes(reaction)) {
      return NextResponse.json(
        { error: "Invalid reaction type." },
        { status: 400 }
      );
    }

    await updateReaction(fileId, reaction);

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}