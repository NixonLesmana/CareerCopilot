import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE() {
  const user = await requireUser();
  await db.user.delete({ where: { id: user.id } });
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  if (formData.get("_method") === "DELETE") {
    return DELETE();
  }
  return NextResponse.json({ error: "Unsupported method." }, { status: 405 });
}
