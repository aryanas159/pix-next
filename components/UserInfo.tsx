"use client";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/store";
export default function UserInfo() {
	const { data: session } = useSession();
    const followers = useSelector((state: RootState) => state.user.followers)
    const following = useSelector((state: RootState) => state.user.following)
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
			<Box className="flex justify-around w-full">
				<Box className="flex flex-col gap-2 items-center">
					<Typography className="text-sm text-black/80">Followers</Typography>
					<Typography className="text-xs text-black/80">{followers.length}</Typography>
				</Box>
				<Box className="flex flex-col gap-2 items-center">
					<Typography className="text-sm text-black/80">Following</Typography>
					<Typography className="text-xs text-black/80">{following.length}</Typography>
				</Box>
			</Box>
		</Box>
	);
}
