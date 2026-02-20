import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await context.params;

    const body = await request.json();
    const { reaction } = body;

    if (!reaction) {
      return NextResponse.json(
        { error: "Reaction is required." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process reaction." },
      { status: 500 }
    );
  }
}
