import { NextRequest, NextResponse } from "next/server";

// Endpoint de debug: captura y loguea cualquier payload
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    const text = await request.text();
    body = { raw: text };
  }
  console.log("=== LEADSBRIDGE PAYLOAD ===", JSON.stringify(body, null, 2));
  return NextResponse.json({ received: true, body }, { status: 200 });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ ok: true }, { status: 200 });
}
