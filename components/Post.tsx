"use client";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserAvatar from "@/components/UserAvatar";
import { getUser, getLikes, getComments } from "@/lib/getFunctions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useSession } from "next-auth/react";
import Comments from "@/components/Comments";
import TimeAgo from "@/components/TimeAgo";
import axios from "axios";
function Post({ postId, userId, postImgUrl, content, timeStamps }: Post) {
	const [user, setUser] = useState<User | null>(null);
	const [likes, setLikes] = useState<Array<Like>>([]);
	const [comments, setComments] = useState<Array<CommentType>>([]);
	const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
	const { data: session } = useSession();
	useEffect(() => {
		getLikes(postId).then((res) => setLikes(res));
		getComments(postId).then((res) => setComments(res));
		getUser(userId).then((res) => setUser(res));
	}, []);
	const handleLike = async () => {
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/like`
			);
			const newLikes = await getLikes(postId);
			setLikes(newLikes);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Box className="flex flex-col bg-white shadow-sm px-4 pt-4 pb-1 rounded-2xl  w-[90vw] sm:w-[35vw] backdrop-blur-lg">
			{user && (
				<Box className="flex items-center pb-4">
					<UserAvatar userId={user?.userId as number} userName={user?.fullName} imageUrl={user?.imageUrl} />
					<Box className="flex flex-col ml-3">
					<Typography className="text-[1.1rem] text-dark font-semibold font-Poppins">
						{user?.fullName}
					</Typography>
					<TimeAgo date={new Date(timeStamps)}/>
					</Box>
				</Box>
			)}
			<Box>
				{content && (
					<Typography paragraph className="px-2 text-[1rem]">{content}</Typography>
				)}
			</Box>
			<Box className="w-full flex items-center justify-center">
				{postImgUrl && (
					<img
						src={postImgUrl}
						alt={postId.toString()}
						className="rounded-2xl max-w-full max-h-[100vh]"
					/>
				)}
			</Box>
			<Box className="flex items-center p-2 transition-all">
				<IconButton onClick={handleLike}>
					{likes.find((like) => like.userId === session?.user?.id) ? (
						<FavoriteIcon className="text-pink text-base transition-all hover:text-xl" />
					) : (
						<FavoriteBorderIcon className="text-pink text-base transition-all hover:text-xl" />
					)}
				</IconButton>
				<Typography className="text-sm">{likes.length}</Typography>
				<IconButton className="ml-2" onClick={() => setCommentsVisible((prev) => !prev)}>
					<ModeCommentIcon className="text-[#0090C1] text-base transition-all hover:text-xl" />
				</IconButton>
				<Typography className="text-sm">{comments.length}</Typography>
			</Box>
			<Box>
				<Collapse in={commentsVisible} orientation="vertical">
					<Comments comments={comments} postId={postId} setComments={setComments}/>
				</Collapse>
			</Box>
		</Box>
	);
}

export default Post;
