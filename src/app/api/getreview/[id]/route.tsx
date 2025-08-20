import { prismaDb } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const url = new URL(req.url);
    const totalRevs = url.searchParams.get("totalRevs");
    const ratingAbove = url.searchParams.get("ratingAbove");
    const sentiment = url.searchParams.get("sentiment"); // <-- new

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Invalid ID" }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } }
      );
    }

    const websiteEx = await prismaDb.website.findUnique({
      where: { id },
    });

    if (!websiteEx) {
      return new Response(
        JSON.stringify({ error: "Website not found" }),
        { status: 404, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } }
      );
    }

    const reviewsWhereCondition: any = {
      websiteId: id,
    };

    if (ratingAbove) {
      reviewsWhereCondition.rating = { gte: Number(ratingAbove) };
    }

    if (sentiment && sentiment !== "all") {
      reviewsWhereCondition.sentiment = sentiment; 
    }

    const reviews = await prismaDb.review.findMany({
      where: reviewsWhereCondition,
      take: totalRevs ? Number(totalRevs) : undefined,
    });

    return new Response(
      JSON.stringify({ webReviews: reviews }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
      }
    );
  } catch (error) {
    console.error("Error occurred while getting website:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get website" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
      }
    );
  }
}
