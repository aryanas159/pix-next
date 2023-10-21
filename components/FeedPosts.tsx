import Post from "@/components/Post";
import { Stack } from "@mui/material";
function FeedPosts({ posts }: { posts: Array<Post> }) {
	if (posts.length) {
		return (
			<Stack spacing={4}>
				{posts.map((post) => (
					<Post key={post.postId} {...post} />
				))}
			</Stack>
		);
	}
	return <>No Posts</>;
}

export default FeedPosts;
