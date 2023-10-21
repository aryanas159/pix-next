import prisma from "@/lib/prismaClient";
import axios from "axios";

export async function getUser(userId: Number): Promise<User | null> {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
		);
		if (res?.data?.user) {
			const { user }: { user: User } = res.data;
			return user;
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getLikes(postId: Number): Promise<Array<Like>> {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/likesCount`
		);
		if (res?.data?.likes) {
			return res.data.likes;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
		return [];
	}
}
export async function getComments(postId: Number): Promise<Array<CommentType>> {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/commentsCount`
		);
		if (res?.data?.comments) {
			return res.data.comments;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function getFollowers(): Promise<Array<User>> {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/follow/followers`
		);
		if (res?.data?.followers) {
			return res.data.followers;
		}
		return [];
	} catch (error) {
		console.log(error);
		return [];
	}
}
export async function getFollowings(): Promise<Array<User>> {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/follow/followings`
		);
		if (res?.data?.followings) {
			return res.data.followings;
		}
		return [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function getAllUsers(): Promise<Array<User>> {
	try {
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/all`);
		if (res?.data?.users) {
			return res.data.users as Array<User>;
		}
		return [];
	} catch (error) {
		console.log(error);
		return [];
	}
}
