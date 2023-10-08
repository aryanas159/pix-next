import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET() {
	try {
		const prisma = new PrismaClient();
		const posts: Array<Post> = await prisma.$queryRaw`
        SELECT * FROM posts
        ORDER BY timeStamps DESC
    `;
		return NextResponse.json({ posts }, { status: 200 });
	} catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", error });
    }
}
