import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isNonsense(text: string) {
  const clean = text.trim();
  if (clean.split(/\s+/).length < 3) return true;
  const nonAlphaRatio =
    (clean.match(/[^a-zA-Z\s]/g)?.length || 0) / clean.length;
  if (nonAlphaRatio > 0.5) return true;
  return false;
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || isNonsense(text)) {
      return NextResponse.json({ label: "nonsense" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Classify the following text as positive, negative, or nonsense:\n"${text}"\nJust respond with one word: positive, negative, or nonsense.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = (await response.text()).trim().toLowerCase();

    let label: "positive" | "negative" | "nonsense" = "nonsense";
    if (output.includes("positive")) label = "positive";
    else if (output.includes("negative")) label = "negative";
    else if (isNonsense(text)) label = "nonsense"; 

    return NextResponse.json({ label });
  } catch (err: any) {
    console.error("Google Gemini error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
