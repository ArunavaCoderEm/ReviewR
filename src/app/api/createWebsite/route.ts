import { prismaDb } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.url || !body.userId) {
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { url, userId } = body;

    const websiteEx = await prismaDb.website.findFirst({
      where: {
        url: url,
      },
    });

    if (websiteEx) {
      return new Response(
        JSON.stringify({ error: "Website already exists with this URL" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const reviewLink = `http://localhost:3000/review/${uuidv4()}`;

    const newWebsite = await prismaDb.website.create({
      data: {
        url,
        reviewLink,
        createdById: userId,
      },
    });

    return new Response(JSON.stringify({ newWebsite }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred while creating website:", error);
    return new Response(JSON.stringify({ error: "Failed to create website" }), {
      status: 500,
    });
  }
}
