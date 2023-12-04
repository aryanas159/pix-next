"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import FollowUserCard from "@/components/FollowUserCard";
import { getAllUsers } from "@/lib/getFunctions";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
function AllUsers() {
	const [users, setUsers] = useState<Array<User>>([]);
	const { data: session } = useSession();
	useEffect(() => {
		getAllUsers().then((res) => {
			console.log(res)
			const users = res.filter((user) => user.userId !== session?.user?.id);
			setUsers(users);
		});
	}, [session]);
	return (
		<Box className="flex flex-col">
			<Box className="flex items-center gap-2 bg-black p-4 sm:rounded-t-2xl">
				<Typography className="font-semibold text-lg text-white">
					Discover people on PIX
				</Typography>
			</Box>
			<Box className="flex flex-col p-4 sm:bg-bg-light rounded-2xl w-full gap-4 max-h-[80vh] overflow-auto">
				{users.map((user) => (
					<FollowUserCard key={user.userId} {...user} />
				))}
			</Box>
		</Box>
	);
}

export default AllUsers;
