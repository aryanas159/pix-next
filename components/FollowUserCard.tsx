"use client";
import { Box, Button, Typography } from "@mui/material";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setFollowing } from "@/lib/redux/slices/user/userSlice";
import { getFollowings } from "@/lib/getFunctions";
import type { RootState } from "@/lib/redux/store";
import { useSession } from "next-auth/react";
const FollowUserCard = ({ userId, fullName, email, imageUrl }: User) => {
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const following = useSelector((state: RootState) => state.user.following);
	const followers = useSelector((state: RootState) => state.user.followers);
	const handleFollow = async () => {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/follow/${userId}`);
			const newFollowing = await getFollowings();
			dispatch(setFollowing({ following: newFollowing }));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Box className="flex p-2 gap-2 items-center">
			<UserAvatar userId={userId as number} userName={fullName} imageUrl={imageUrl} />
			<Box className="flex flex-col grow pr-2 justify-center">
				<Typography className="text-dark/80 text-sm font-semibold font-Poppins">
					{fullName}
				</Typography>
				<Typography className="text-xs text-black">{email}</Typography>
				{followers.find((user) => (user.userId === userId)) && (
					<Typography className="text-[0.65rem] text-green font-semibold">Follows you</Typography>
				)}
			</Box>
			{session?.user?.id !== userId &&
				(following.find((user) => user.userId == userId) ? (
					<Button
						variant="contained"
						size="small"
						className="rounded-2xl bg-white text-black text-xs py-1 hover:bg-dark hover:text-light"
						onClick={handleFollow}
					>
						Unfollow
					</Button>
				) : (
					<Button
						variant="contained"
						size="small"
						className="rounded-2xl bg-black text-white text-xs py-1 hover:bg-light hover:text-dark"
						onClick={handleFollow}
					>
						Follow
					</Button>
				))}
		</Box>
	);
};

export default FollowUserCard;
