import { prismaDb } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;


    if (!id) {
      return new Response(
        JSON.stringify({ error: "Invalid ID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const baseUrl = process.env.NODE_ENV === "production" ? "https://yourproductionurl.com" : "http://localhost:3000";
        
    const websiteEx = await prismaDb.website.findFirst({
      where: {
        reviewLink: `${baseUrl}/review/${id}`,
      },
    });


    return new Response(
      JSON.stringify({ yourWebsite: websiteEx }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error occurred while getting website:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get website" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
