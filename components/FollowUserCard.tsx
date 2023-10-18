import { Box, Button, Typography } from "@mui/material";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import { getFollowers } from "@/lib/getFunctions";
const FollowUserCard = ({
	user: { userId, fullName, email, imageUrl },
	followers,
	setFollowers,
}: {
	user: User;
	followers: Array<User>;
	setFollowers: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
	const handleFollow = async () => {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/follow/${userId}`);
			const newFollowers = await getFollowers();
			setFollowers(newFollowers);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Box className="flex p-2 gap-2">
			<UserAvatar userName={fullName} imageUrl={imageUrl} />
			<Box className="flex flex-col grow">
				<Typography className="text-white/50 text-sm">{fullName}</Typography>
				<Typography className="text-xs">{email}</Typography>
			</Box>
			{followers.find((follower) => follower.userId == userId) ? (
				<Button
					variant="contained"
					className="rounded-2xl bg-white text-black"
					onClick={handleFollow}
				>
					Unfollow
				</Button>
			) : (
				<Button
					variant="contained"
					className="rounded-2xl bg-black text-white"
					onClick={handleFollow}
				>
					Follow
				</Button>
			)}
		</Box>
	);
};

export default FollowUserCard;