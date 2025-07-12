import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// 購入履歴の保存
export async function POST(req: Request) {
  const { sessionId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = session.client_reference_id!;
    const bookId = session.metadata?.bookId!;

    let purchase = await prisma.purchase.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (!purchase) {
      purchase = await prisma.purchase.create({
        data: {
          userId,
          bookId,
        },
      });
    }

    return NextResponse.json({ purchase });

  } catch (err) {
    console.error("[/api/checkout/success] Error:", err);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}