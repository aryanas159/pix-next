"use client";
import React from "react";
import { Box } from "@mui/material";
import ChatUserCard from "@/components/ChatUserCard";
import { useState, useEffect } from "react";
import { getFollowings } from "@/lib/getFunctions";
import { UserSession } from "@/types/next-auth";
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
		<Box className="flex flex-col bg-white p-4 rounded-2xl gap-4 m-4">
			{users.map((user) => (
				<ChatUserCard
					key={user.userId?.toString()}
					{...user}
					isOnline={
						!!onlineUsers?.find((onlineUser) => onlineUser.id === user.userId)
					}
                    handleUserClick={handleUserClick}
				/>
			))}
		</Box>
	);
}

export default ChatUsers;