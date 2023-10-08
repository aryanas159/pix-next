import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(request: Request, { params: { postId } }: { params: { postId: number } }) {
	try {
		const prisma = new PrismaClient();
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
        console.log(session.user)
		const { id: userId } = session.user;
		await prisma.$queryRaw`
        INSERT INTO likes (userId, postId)
        VALUES (${userId}, ${postId})
    `;
		return NextResponse.json({ message: "Post liked" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Something went wrong", error });
	}
}
