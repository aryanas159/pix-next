import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

type RequestBody = {
	postImgUrl: string;
	content: string;
};
export async function POST(request: Request) {
	const prisma = new PrismaClient();
	const session = await getServerSession(authOptions);
	try {
		if (session?.user) {
			const { id } = session.user as { id: number };
			const { postImgUrl, content }: RequestBody = await request.json();
			await prisma.$queryRaw`
                INSERT INTO posts (userId, postImgUrl, content)
                VALUES (${id}, ${postImgUrl}, ${content});
            `;
			const post: Array<Post> = await prisma.$queryRaw`
                SELECT * FROM posts
                WHERE postId = LAST_INSERT_ID();
            `;
			return NextResponse.json({post: post[0]}, { status: 200 });
		}
		return NextResponse.json({ session: null });
	} catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", error });
    }
}