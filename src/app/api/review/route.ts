import { prismaDb } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.content || !body.rating || !body.reviewer || !body.profession || !body.websiteId) {
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { content, rating, reviewer, profession, websiteId, sentiment } = body;

    const websiteEx = await prismaDb.website.findFirst({
      where: {
        id: websiteId,
      },
    });

    if (!websiteEx) {
      return new Response(
        JSON.stringify({ error: "Website does not exist" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const newReview = await prismaDb.review.create({
      data: {
        content,
        rating,
        reviewer,
        websiteId,
        profession,
        sentiment
      },
    });

    return new Response(JSON.stringify({ newReview }), {
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
