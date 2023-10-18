"use client";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import { getFollowers, getFollowings } from "@/lib/getFunctions";
export default function UserInfo() {
	const { data: session } = useSession();
    const [followers, setFollowers] = useState<Array<User>>([]);
    const [followings, setFollowings] = useState<Array<User>>([]);
    useEffect(() => {
        getFollowers().then(res => setFollowers(res))
        getFollowings().then(res => setFollowings(res))
    }, [])
	return (
		<Box className="m-4 p-8 bg-gray-dark rounded-2xl flex flex-col gap-2 items-center w-1/3">
			{session && (
				<UserAvatar
					userName={session.user.name}
					imageUrl={session.user.image}
					size={128}
				/>
			)}
			<Typography className="text-[1.2rem] mt-4">
				{session && session.user.name}
			</Typography>
			<Box className="flex justify-around w-full">
				<Box className="flex flex-col gap-2 items-center">
					<Typography className="text-sm">Followers</Typography>
					<Typography className="text-xs">{followers.length}</Typography>
				</Box>
				<Box className="flex flex-col gap-2 items-center">
					<Typography className="text-sm">Following</Typography>
					<Typography className="text-xs">{followings.length}</Typography>
				</Box>
			</Box>
		</Box>
	);
}
