import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const portfolio = await req.json();

    if (!portfolio) {
      return NextResponse.json(
        { success: false, error: "Portfolio data is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("folioforge");

    const result = await db.collection("portfolios").insertOne({
      portfolio,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
      url: `/p/${result.insertedId.toString()}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}