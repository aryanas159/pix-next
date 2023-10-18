import React from "react";
import CreatePost from "@/components/CreatePost";
type Props = {};
import { Box, Container } from "@mui/material";
import FeedPosts from "@/components/FeedPosts";
import UserInfo from "@/components/UserInfo";
import AllUsers from "@/components/AllUsers";
function Feed({}: Props) {
	return (
		<Container maxWidth="xl" className="flex gap-4 items-start mt-4">
			<UserInfo />
			<Container className="flex flex-col gap-4 justify-center mt-4">
				<CreatePost />
				<FeedPosts />
			</Container>
			<AllUsers />
		</Container>
	);
}

export default Feed;
