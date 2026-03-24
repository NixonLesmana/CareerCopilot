import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { renderArtifactPdf } from "@/services/export-service";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const artifactId = String(body.artifactId ?? "");

  const artifact = await db.generatedArtifact.findFirst({
    where: { id: artifactId, userId: user.id },
  });

  if (!artifact) {
    return NextResponse.json({ error: "Artifact not found." }, { status: 404 });
  }

  const content = artifact.content as Record<string, unknown>;
  const paragraphs = Array.isArray(content.body)
    ? content.body.map((item) => String(item))
    : [JSON.stringify(content, null, 2)];
  const pdfBuffer = await renderArtifactPdf(artifact.title, paragraphs);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${artifact.title}.pdf"`,
    },
  });
}
