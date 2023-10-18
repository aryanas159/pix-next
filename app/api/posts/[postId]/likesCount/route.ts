import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET(
	request: Request,
	{ params: { postId } }: { params: { postId: number } }
) {
	try {
		const prisma = new PrismaClient();
		const likes = await prisma.$queryRaw`
            SELECT * FROM likes
            WHERE postId = ${postId}
    `;
		return NextResponse.json({ likes }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Something went wrong", error });
	}
}
