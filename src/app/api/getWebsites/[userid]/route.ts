import { prismaDb } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const { userid } = params;


    if (!userid) {
      return new Response(
        JSON.stringify({ error: "Invalid ID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }


    const allwebsiteEx = await prismaDb.website.findMany({
      where: {
        createdById: userid,
      },
    });


    return new Response(
      JSON.stringify({ yourWebsites: allwebsiteEx }),
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
