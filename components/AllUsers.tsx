"use client";
import React from "react";
import { Box } from "@mui/material";
import FollowUserCard from "@/components/FollowUserCard";
import { getAllUsers, getFollowers } from "@/lib/getFunctions";
import { useState, useEffect } from "react";
function AllUsers() {
	const [users, setUsers] = useState<Array<User>>([]);
	const [followers, setFollowers] = useState<Array<User>>([]);
	useEffect(() => {
		getAllUsers().then((res) => setUsers(res));
		getFollowers().then((res) => setFollowers(res));
	}, []);
	return (
		<Box className="flex flex-col p-4 bg-gray-dark rounded-2xl w-1/3 gap-4">
			{users.map((user) => (
				<FollowUserCard
					key={user.id?.toString()}
					user={user}
					followers={followers}
					setFollowers={setFollowers}
				/>
			))}
		</Box>
	);
}

export default AllUsers;
