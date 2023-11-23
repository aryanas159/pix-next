"use client";
import { useEffect, useState } from "react";
import UserInfo from "@/components/UserInfo";
import FeedPosts from "@/components/FeedPosts";
import AllUsers from "@/components/AllUsers";
import { Container, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import {
	getUserPosts,
	getFollowers,
	getFollowings,
	getUser,
} from "@/lib/getFunctions";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
type Props = {
	params: {
		userId: number;
	};
};

export default function UserPage({ params: { userId } }: Props) {
	const [posts, setPosts] = useState<Array<Post> | null>(null);
	const [user, setUser] = useState<User | null>();
	const [followers, setFollowers] = useState<Array<User>>([]);
	const [following, setFollowing] = useState<Array<User>>([]);
	const isMobile = useMediaQuery("(max-width:800px)");
	useEffect(() => {
		TimeAgo.addDefaultLocale(en);
		TimeAgo.addLocale(ru);
		getUser(userId)
			.then((res) => setUser(res))
			.catch((err) => console.log(err));
		getUserPosts(userId)
			.then((res) => setPosts(res))
			.catch((err) => console.log(err));
		getFollowers(userId)
			.then((res) => setFollowers(res))
			.catch((err) => console.log(err));
		getFollowings(userId)
			.then((res) => setFollowing(res))
			.catch((err) => console.log(err));
	}, []);
	return (
		<Box
			className="mx-4 flex xs:flex-col sm:flex-row sm:px-64 gap-8 xs:items-center sm:items-start pt-8 bg-bg-dark min-h-[100vh] mb-8"
		>
			<UserInfo
				user={
					user
						? {
								userId: user.userId as number,
								fullName: user.fullName,
								imageUrl: user.imageUrl,
								email: user.email,
						  }
						: {
								userId: 0,
								fullName: "",
								imageUrl: "",
								email: "",
						  }
				}
				followers={followers}
				following={following}
			/>
			<Container className="flex flex-col gap-4 p-0">
				<FeedPosts posts={posts} />
			</Container>
		</Box>
	);
}
