import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismaClient";
export async function GET() {
	try {
		const session = await getServerSession(authOptions);
		if (session?.user?.id) {
			const res: Array<User> = await prisma.$queryRaw`
                SELECT userId, fullName, email, imageUrl FROM followers
                INNER JOIN users
                ON followers.followingId = users.userId
                WHERE followerId = ${session.user.id}
            `;
			return NextResponse.json({ followings: res }, { status: 200 });
		}
		return NextResponse.json({ message: "Not authorized" }, { status: 401 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
