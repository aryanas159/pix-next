import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET() {
	try {
		const prisma = new PrismaClient();
		const users: Array<User> = await prisma.$queryRaw`
        SELECT * FROM users
    `;
		return NextResponse.json({ users });
	} catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong", error}, {status: 500});
    }
}
