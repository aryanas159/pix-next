"use client";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/store";
import FollowUserCard from "@/components/FollowUserCard";
export default function UserInfo() {
	const { data: session } = useSession();
	const followers = useSelector((state: RootState) => state.user.followers);
	const following = useSelector((state: RootState) => state.user.following);
	const [showFollowers, setShowFollowers] = useState<Boolean>(false);
	return (
		<Box className="p-8 bg-white shadow-sm rounded-2xl flex flex-col gap-2 items-center w-1/3">
			{session && (
				<UserAvatar
					userName={session.user.name}
					imageUrl={session.user.image}
					size={128}
				/>
			)}
			<Typography className="text-[1.2rem] mt-4 text-dark font-semibold font-Poppins">
				{session && session.user.name}
			</Typography>
			<Box className="flex justify-around w-full items-start">
				<Box
					className="flex flex-col items-center cursor-pointer"
					onClick={() => setShowFollowers(true)}
				>
					<Box className="flex flex-col items-center">
						<Typography className="text-sm text-black/80 flex items-center flex-col">
							Followers
						</Typography>
						{showFollowers && (
							<div className="bg-light h-[2px] w-10 rounded-full mt-[2px]"></div>
						)}
					</Box>

					<Typography className="text-xs text-black/80 mt-2">
						{followers.length}
					</Typography>
				</Box>
				<Box
					className="flex flex-col items-center cursor-pointer"
					onClick={() => setShowFollowers(false)}
				>
					<Box className="flex flex-col items-center">
						<Typography className="text-sm text-black/80">Following</Typography>
						{!showFollowers && (
							<div className="bg-light h-[2px] w-10 rounded-full mt-[2px]"></div>
						)}
					</Box>

					<Typography className="text-xs text-black/80 mt-2">
						{following.length}
					</Typography>
				</Box>
			</Box>
			<Box className="flex flex-col gap-2 pt-4">
				{showFollowers
					? !!followers?.length &&
					  followers.map((follower) => (
							<FollowUserCard key={follower.userId} {...follower} />
					  ))
					: !!following?.length &&
					  following.map((follower) => (
							<FollowUserCard key={follower.userId} {...follower} />
					  ))}
			</Box>
		</Box>
	);
}
