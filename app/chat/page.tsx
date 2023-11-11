"use client";
import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Container, Grid, Stack, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import ChatUsers from "@/components/ChatUsers";
import SelectedUserInfo from "@/components/SelectedUserInfo";
import type { UserSession } from "@/types/next-auth";
import { getMessages } from "@/lib/getFunctions";
import Message from "@/components/Message";
import { postMessage } from "@/lib/getFunctions";
import UserTyping from "@/components/UserTyping";
import { socket } from "@/lib/socket";
interface SocketSession extends UserSession {
	socketId: string;
}
function Chat() {
	const { data: session } = useSession();
	const [messageText, setMessageText] = useState("");
	const [onlineUsers, setOnlineUsers] = useState<Array<SocketSession>>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [currentRoom, setCurrentRoom] = useState<string>("");
	const [messages, setMessages] = useState<Array<Message>>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const messageRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (session?.user) {
			socket.emit("socket-connection", session.user);
		}
		const onConnect = () => {
			console.log("connected");
			setIsConnected(true);
		};
		const onDisconnect = () => {
			console.log("disconnected");
			setIsConnected(false);
		};
		const onOnlineUsers = ({
			onlineUsers,
		}: {
			onlineUsers: Array<SocketSession>;
		}) => {
			setOnlineUsers(onlineUsers);
		};
		const onMessage = (message: string) => {
			console.log(message);
		};
		const onChatMessage = (message: Message) => {
			setMessages((prev) => [...prev, message]);
		};
		const onTyping = ({
			room,
			userSession,
		}: {
			room: string;
			userSession: UserSession;
		}) => {
			setIsTyping(true);
		};
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("online-users", onOnlineUsers);
		socket.on("message", onMessage);
		socket.on("chat-message", onChatMessage);
		socket.on("typing", onTyping);
		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("online-users", onOnlineUsers);
			socket.off("message", onMessage);
			socket.off("chat-message", onChatMessage);
			socket.off("typing", onTyping);
		};
	}, []);
	useEffect(() => {
		const timeOut = setTimeout(() => {
			setIsTyping(false);
		}, 8000);
		return () => clearTimeout(timeOut);
	}, [isTyping]);
	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start",
			});
		}
	}, [messages, isTyping]);
	const handleMessage = async () => {
		const message: Message = {
			message: messageText,
			senderId: session?.user.id as number,
			receiverId: selectedUser?.userId as number,
		};
		if (currentRoom) {
			await postMessage(message);
			socket.emit("chat-message", {
				message,
				room: currentRoom,
			});
		}
		setMessageText("");
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
		setCurrentRoom(room);
		socket.emit("room-join", {
			room: room,
			user: session,
			to: selectedUser,
		});
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
				<Box className="flex flex-col p-4 gap-2 bg-white rounded-2xl h-[60vh] w-1/2 overflow-y-scroll">
					<>
						{messages.map(({ senderId, message }) => (
							<Message
								message={message}
								isSender={session?.user.id === senderId}
							/>
						))}
						{isTyping && <UserTyping />}
						<div ref={messageRef} />
					</>
				</Box>
				<Box className="flex gap-2 p-4 m-4">
					<TextField
						label="Message"
						value={messageText}
						onChange={(e) => setMessageText(e.target.value)}
						onKeyDown={() => {
							socket.emit("typing", {
								room: currentRoom,
								userSession: session?.user,
							});
						}}
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
