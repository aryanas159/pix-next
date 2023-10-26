import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
export async function POST(request: Request) {
	try {
		const url = new URL(request.url);
		const senderId = url.searchParams.get("senderId");
		const receiverId = url.searchParams.get("receiverId");
		const { message } = await request.json();
		if (senderId && receiverId) {
			await prisma.$queryRaw`
            INSERT INTO messages(senderId, receiverId, message)
            VALUES(${senderId}, ${receiverId}, ${message})
        `;
			return NextResponse.json(
				{ message: "Message posted successfully" },
				{ status: 200 }
			);
		}
		return NextResponse.json(
			{ message: "Provide necessary information" },
			{ status: 400 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
