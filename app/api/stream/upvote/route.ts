import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
const UpvoteSchema = z.object({
    streamId: z.string(),

})

export async function POST(req: NextRequest){
    const session = await getServerSession();
    // Todo: Replace this with the id.

    const user = await prisma.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    })

    if(!session?.user?.email) {
        return NextResponse.json({
            message: "Unauthenticated",
        }, {
            status: 403
        })
    }


    try{
        const data = UpvoteSchema.parse(await req.json());
        await prisma.upVote.create({
            data: {
                userId: user?.id || "",
                streamId: data.streamId
            }
        })
    } catch(e) {
        return NextResponse.json({
            message: "Error occured",
            Error: e
        }, {
            status: 500
        })
    }
}