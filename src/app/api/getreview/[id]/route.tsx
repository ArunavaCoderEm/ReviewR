import { prismaDb } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
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
          "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
      });
    }

    const reviews = await prismaDb.review.findMany({
      where: {
        websiteId: id,
      },
    });

    return new Response(JSON.stringify({ webReviews: reviews }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
    });
  } catch (error) {
    console.error("Error occurred while getting website:", error);
    return new Response(JSON.stringify({ error: "Failed to get website" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
    });
  }
}
