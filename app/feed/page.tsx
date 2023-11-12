"use client";
import CreatePost from "@/components/CreatePost";
import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import FeedPosts from "@/components/FeedPosts";
import UserInfo from "@/components/UserInfo";
import AllUsers from "@/components/AllUsers";
import { getFollowers, getFollowings } from "@/lib/getFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setFollowers, setFollowing } from "@/lib/redux/slices/user/userSlice";
import type { RootState } from "@/lib/redux/store";
import { useSession } from "next-auth/react";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import { useRouter } from "next/navigation";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ChatSection from "@/components/ChatSection";
import { Toaster } from "react-hot-toast";
function Feed() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [posts, setPosts] = useState<Array<Post>>([]);
	const { data: session } = useSession();
	const followers = useSelector((state: RootState) => state.user.followers);
	const following = useSelector((state: RootState) => state.user.following);
	useEffect(() => {
		TimeAgo.addDefaultLocale(en);
		TimeAgo.addLocale(ru);
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
			.then((res) => setPosts(res?.data?.posts))
			.catch((err) => console.log(err));
		getFollowers()
			.then((res) => dispatch(setFollowers({ followers: res })))
			.catch((err) => console.log(err));
		getFollowings()
			.then((res) => dispatch(setFollowing({ following: res })))
			.catch((err) => console.log(err));
		console.log("exec");
	}, []);
	return (
		session?.user && (
			<Box className="flex px-8 gap-8 items-start pt-8 bg-bg min-h-screen">
				<Toaster />
				<UserInfo
					user={{
						userId: session?.user?.id,
						fullName: session?.user?.name,
						imageUrl: session?.user?.image,
						email: session?.user?.email,
					}}
					followers={followers}
					following={following}
				/>

				<Box className="flex flex-col gap-4 items-center flex-1">
					<CreatePost setPosts={setPosts} />
					<FeedPosts posts={posts} />
				</Box>
				<ChatSection />
			</Box>
		)
	);
}

export default Feed;
