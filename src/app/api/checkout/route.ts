import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest, res: NextResponse) {
    const { title, price, bookId, userId } = await req.json();

    const priceNumber = typeof price === "string" ? parseInt(price, 10) : price;

    if (!priceNumber || isNaN(priceNumber)) {
        return NextResponse.json({ error: "価格が不正です" }, { status: 400 });
    }

    console.log("取得したデータ内容：", { title, price, bookId, userId });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            metadata: {
                bookId: bookId,
            },
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: "jpy",
                        product_data: {
                            name: title,
                        },
                        unit_amount: priceNumber,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000`,
        });
        return NextResponse.json({ checkout_url: session.url });
    } catch (err:any) {
        console.error("Stripeエラーの詳細:", err.raw);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}