"use client";
import React from "react";
import { Box } from "@mui/material";
import ChatUserCard from "@/components/ChatUserCard";
import { useState, useEffect } from "react";
import { getFollowings } from "@/lib/getFunctions";
import { UserSession } from "@/types/next-auth";
import { Skeleton } from "@mui/material";
type ChatUserProps = {
	onlineUsers: Array<UserSession>;
	handleUserClick: (user: User) => void;
};
function ChatUsers({ onlineUsers, handleUserClick }: ChatUserProps) {
	const [users, setUsers] = useState<Array<User>>([]);
	useEffect(() => {
		getFollowings()
			.then((res) => setUsers(res))
			.catch((err) => console.log(err));
	}, []);
	return (
		<Box className="flex flex-col bg-bg-light p-4 rounded-2xl gap-2 m-4 overflow-y-auto max-h-100vh">
			{users?.length ? (
				<>
					{users.map((user) => (
						<ChatUserCard
							key={user.userId}
							{...user}
							isOnline={
								!!onlineUsers?.find(
									(onlineUser) => onlineUser.id === user.userId
								)
							}
							handleUserClick={handleUserClick}
						/>
					))}
				</>
			) : (
				<>
					<Skeleton
						variant="rectangular"
						className="w-full h-[40px] rounded-2xl"
						animation="wave"
					/>
					<Skeleton
						variant="rectangular"
						className="w-full h-[40px] rounded-2xl"
						animation="wave"
					/>
					<Skeleton
						variant="rectangular"
						className="w-full h-[40px] rounded-2xl"
						animation="wave"
					/>
				</>
			)}
		</Box>
	);
}

export default ChatUsers;
