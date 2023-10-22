"use client";
import { useEffect, useState } from "react";
import UserInfo from "@/components/UserInfo";
import FeedPosts from "@/components/FeedPosts";
import AllUsers from "@/components/AllUsers";
import { Container } from "@mui/material";
import { getUserPosts } from "@/lib/getFunctions";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
type Props = {
	params: {
		userId: number;
	};
};

export default function UserPage({ params: { userId } }: Props) {
	const [posts, setPosts] = useState<Array<Post>>([]);
	useEffect(() => {
		TimeAgo.addDefaultLocale(en);
		TimeAgo.addLocale(ru);
		getUserPosts(userId)
			.then((res) => setPosts(res))
			.catch((err) => console.log(err));
	}, []);
	return (
		<Container
			maxWidth="xl"
			className="flex px-12 gap-2 items-start pt-8 bg-[#ededed] min-h-[100vh]"
		>
			<UserInfo />
			<Container className="flex flex-col gap-4 items-center">
				<FeedPosts posts={posts} />
			</Container>
			<AllUsers />
		</Container>
	);
}
