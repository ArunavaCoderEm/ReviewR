import { prismaDb } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { totalRevs, ratingAbove } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Methods": "POST,OPTIONS", 
        },
      });
    }

    const websiteEx = await prismaDb.website.findMany({
      where: {
        id: id,
      },
    });

    if (!websiteEx || websiteEx.length === 0) {
      return new Response(JSON.stringify({ error: "Website not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Methods": "POST,OPTIONS", 
        },
      });
    }

    const reviewsWhereCondition: any = {
      websiteId: id,
    };

    if (ratingAbove) {
      reviewsWhereCondition.rating = { gte: ratingAbove };
    }

    const reviews = await prismaDb.review.findMany({
      where: reviewsWhereCondition,
      take: totalRevs ? totalRevs : undefined,
    });

    return new Response(JSON.stringify({ webReviews: reviews }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "POST,OPTIONS", 
      },
    });
  } catch (error) {
    console.error("Error occurred while getting website:", error);
    return new Response(JSON.stringify({ error: "Failed to get website" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "POST,OPTIONS", 
      },
    });
  }
}