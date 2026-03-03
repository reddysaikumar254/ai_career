import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

/* ===================== POST ===================== */
/* Create a new history record */
export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { recordId, content, aiAgentType } = await req.json();

    if (!recordId || !aiAgentType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.insert(HistoryTable).values({
      recordId,
      content: content || null,
      aiAgentType,
      userEmail: user.primaryEmailAddress.emailAddress,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("POST /api/history error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}

/* ===================== GET ===================== */
/* Fetch history records */
export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get("recordId");

    // Fetch single record
    if (recordId) {
      const result = await db
        .select()
        .from(HistoryTable)
        .where(eq(HistoryTable.recordId, recordId));

      return NextResponse.json(result[0] ?? null);
    }

    // Fetch all user history
    const result = await db
      .select()
      .from(HistoryTable)
      .where(eq(HistoryTable.userEmail, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(HistoryTable.id));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/history error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ===================== PUT ===================== */
/* Update history record */
export async function PUT(req: Request) {
  try {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { recordId, content } = await req.json();

    if (!recordId) {
      return NextResponse.json(
        { error: "Missing recordId" },
        { status: 400 }
      );
    }

    const result = await db
      .update(HistoryTable)
      .set({
        content,
        createdAt: new Date().toISOString(),
      })
      .where(eq(HistoryTable.recordId, recordId))
      .returning();

    return NextResponse.json(result[0] ?? null);
  } catch (error) {
    console.error("PUT /api/history error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
