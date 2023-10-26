"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TextField, Button, Container, Grid, Stack, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/redux/store";
import { getFollowings } from "@/lib/getFunctions";
import FollowUserCard from "@/components/FollowUserCard";
import { useSession } from "next-auth/react";
import { setFollowing } from "@/lib/redux/slices/user/userSlice";
import type { UserSession } from "@/types/next-auth";
interface SocketSession extends UserSession {
	socketId: string
}
function Chat() {
	const { data: session } = useSession();
	const [socket, setSocket] = useState<any>(null);
	const [message, setMessage] = useState("");
	const [connectedUsers, setConnectedUsers] = useState<Array<SocketSession>>([])
	const dispatch = useDispatch();
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [currentroom, setCurrentRoom] = useState<string | null>(null)
	useEffect(() => {
		getFollowings(session?.user.id).then((res) =>
			dispatch(setFollowing({ following: res }))
		);
		if (!socket) {
			setSocket(io("http://localhost:4000"));
		}
	}, [session]);
	useEffect(() => {
		if (socket && session?.user) {
				socket.emit("socket-connection", session.user)
				socket.on("connected-users", ({connectedUsers}: {connectedUsers: Array<SocketSession>}) => {
					setConnectedUsers(connectedUsers)
				})
				socket.on("message", (message: string) => {
					console.log(message)
				})
		}
	}, [socket, session]);
	const handleMessage = () => {
		console.log({message, currentroom})
		socket.emit("message", {
			text: message,
			room: currentroom
		});
		setMessage("");
	};

	const followings = useSelector((state: RootState) => state.user.following);
	const handleSelectUser = (user: User) => {
		setSelectedUser(user);
		const myId = session?.user.id as number
		const theirId = user.userId as number
		const room = (myId > theirId )? `${theirId}-${myId}-room` : `${myId}-${theirId}-room`
		socket.emit("room-join", {
			room : room,
			user: session,
			to: selectedUser
		})
		setCurrentRoom(room)
	};
	return (
		<Grid container direction="row" spacing={8}>
			<Grid item xs={3}>
				{followings.map((user) => 
					connectedUsers.find(connectedUser => connectedUser.id === user.userId) ? (
						<Box
						className="cursor-pointer bg-yellow"
						onClick={() => {
							handleSelectUser(user);
						}}
					>
						<FollowUserCard {...user} />
					</Box>
					) : (
						<Box
						className="cursor-pointer"
						onClick={() => {
							handleSelectUser(user);
						}}
					>
						<FollowUserCard {...user} />
					</Box>
					)
				)}
			</Grid>
			<Grid item xs={9}>
				<Stack className="h-[60vh]">
					{selectedUser && <Box>Chatting with {selectedUser.fullName}</Box>}
				</Stack>
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
			</Grid>
		</Grid>
	);
}

export default Chat;
