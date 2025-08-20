"use server"

import { prismaDb } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function checkUserNeon() {
    const user = await currentUser();
    if (user?.id) {
        try {
            const isUser = await prismaDb.user.findUnique({
                where: {
                    clerkid: user?.id
                }
            });

            if (isUser) {
                return isUser;
            }

            const email = user?.emailAddresses?.[0]?.emailAddress;
            if (!email) {
                console.log("Email address not found");
                return null;
            }

            const newUser = await prismaDb.user.create({
                data: {
                    email: email,
                    clerkid: user?.id,
                    name: user?.fullName,  
                }
            });

            return newUser;

        } catch (e) {
            console.error("Error during user check or creation", e);
            throw new Error("Error creating or checking user");
        }

    } else {
        console.log("User not authenticated");
        return null;
    }
}