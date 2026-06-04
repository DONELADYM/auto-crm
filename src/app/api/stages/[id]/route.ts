import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pipelineStages, deals } from "@/db/schema";
import { eq } from "drizzle-orm";

// PUT: editar una etapa (nombre, color, orden, ganado/perdido)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: {
    name?: string;
    color?: string;
    order?: number;
    isWon?: boolean;
    isLost?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const existing = db
    .select()
    .from(pipelineStages)
    .where(eq(pipelineStages.id, id))
    .get();
  if (!existing) {
    return NextResponse.json({ error: "Etapa no encontrada" }, { status: 404 });
  }

  const update: Record<string, unknown> = {};
  if (body.name !== undefined) update.name = body.name.trim();
  if (body.color !== undefined) update.color = body.color;
  if (body.order !== undefined) update.order = body.order;
  if (body.isWon !== undefined) update.isWon = body.isWon;
  if (body.isLost !== undefined) update.isLost = body.isLost;

  const result = db
    .update(pipelineStages)
    .set(update)
    .where(eq(pipelineStages.id, id))
    .returning()
    .get();

  return NextResponse.json(result);
}

// DELETE: eliminar una etapa (solo si no tiene deals)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dealsInStage = db.select().from(deals).where(eq(deals.stageId, id)).all();
  if (dealsInStage.length > 0) {
    return NextResponse.json(
      {
        error: `No se puede eliminar: hay ${dealsInStage.length} deal(s) en esta etapa. Muévelos primero.`,
      },
      { status: 400 }
    );
  }

  db.delete(pipelineStages).where(eq(pipelineStages.id, id)).run();
  return NextResponse.json({ success: true });
}
