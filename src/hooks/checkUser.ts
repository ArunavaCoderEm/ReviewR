"use server"

import { prismaDb } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function checkUserNeon () {
    const user = await currentUser();
    if (user?.id) {
        try {
            const isUser = await prismaDb.user.findUnique({
                where: {
                    clerkid: user?.id
                }
            }) 
            if (isUser) {
                return isUser;
            }

            const newUser = prismaDb.user.create({
                data: {
                    email: user?.emailAddresses[0]?.emailAddress,
                    clerkid: user?.id,
                    name: user?.fullName,  
                }
            })  

            return newUser;

        } catch(e) {
            console.log("Error ", e);
        }

    } else {
        console.log("User not authenticated");
        return null;
    }
}