"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TextField, Button, Container, Grid, Stack, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import ChatUsers from "@/components/ChatUsers";
import SelectedUserInfo from "@/components/SelectedUserInfo";
import type { UserSession } from "@/types/next-auth";
import { getMessages } from "@/lib/getFunctions";
import Message from "@/components/Message";
interface SocketSession extends UserSession {
	socketId: string;
}
function Chat() {
	const { data: session } = useSession();
	const [socket, setSocket] = useState<any>(null);
	const [message, setMessage] = useState("");
	const [onlineUsers, setOnlineUsers] = useState<Array<SocketSession>>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [currentroom, setCurrentRoom] = useState<string | null>(null);
	const [messages, setMessages] = useState<Array<Message>>([]);
	useEffect(() => {
		if (!socket) {
			setSocket(io("http://localhost:4000"));
		}
	}, [session]);
	useEffect(() => {
		if (socket && session?.user) {
			socket.emit("socket-connection", session.user);
			socket.on(
				"online-users",
				({ onlineUsers }: { onlineUsers: Array<SocketSession> }) => {
					setOnlineUsers(onlineUsers);
				}
			);
			socket.on("message", (message: string) => {
				console.log(message);
			});
		}
	}, [socket, session]);
	const handleMessage = () => {
		console.log({ message, currentroom });
		socket.emit("message", {
			text: message,
			room: currentroom,
		});
		setMessage("");
	};
	const handleSelectUser = (user: User) => {
		setSelectedUser(user);
		const myId = session?.user.id as number;
		const theirId = user.userId as number;
		getMessages(myId, theirId)
		.then((res) => setMessages(res))
		.catch((err) => console.log(err));
		
		const room =
			myId > theirId ? `${theirId}-${myId}-room` : `${myId}-${theirId}-room`;
		socket.emit("room-join", {
			room: room,
			user: session,
			to: selectedUser,
		});
		setCurrentRoom(room);
	};
	return (
		<Grid container direction="row" spacing={8} className="bg-[#eee] h-screen">
			<Grid item xs={3}>
				<ChatUsers
					onlineUsers={onlineUsers}
					handleUserClick={handleSelectUser}
				/>
			</Grid>
			<Grid item xs={9} className="flex flex-col items-center">
				<SelectedUserInfo selectedUser={selectedUser} />
				<Box className="flex flex-col p-4 gap-2 bg-white rounded-2xl grow w-1/2 overflow-y-scroll">
					{messages.map(({senderId, message}) => (
						<Message message={message} isSender={session?.user.id === senderId}/>
					))}
				</Box>
				<Box className="flex gap-2 p-4 m-4">
				<TextField
					label="Message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button
					variant="contained"
					className="bg-black"
					onClick={handleMessage}
				>
					Send
				</Button>
				</Box>
			</Grid>
		</Grid>
	);
}

export default Chat;
