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
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  if (mode === "subscribe" && token) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
