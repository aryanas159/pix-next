import React from "react";
import axios from "axios";
import Post from "@/components/Post";
import { Stack } from "@mui/material";
async function FeedPosts() {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
	if (res?.data?.posts) {
		const posts: Array<Post> = res.data.posts;
		if (posts.length) {
			return (
				<Stack
					spacing={4}
				>
					{posts.map((post) => (
						<Post key={post.postId} {...post} />
					))}
				</Stack>
			);
		}
	}
    return <>No Posts</>;
}

export default FeedPosts;
