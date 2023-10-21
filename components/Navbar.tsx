"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { InputBase } from "@mui/material";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
export default function Navbar() {
	const { data: session, status } = useSession();
	return (
		<AppBar
			position="sticky"
			sx={{
				backgroundColor: "#4158D0",
				backgroundImage:
					"linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
				backdropFilter: "blur(30px) opacity(0.1)",
			}}
		>
			<Toolbar>
				<Box className="flex gap-4 grow items-center pl-8 cursor-pointer">
					<Image src="/assets/logo_dark.png" alt="PIX" width={40} height={40} />
					<Typography
						variant="h6"
						component="div"
						className="text-[1.8rem] font-AROneSans tracking-wider"
					>
						PIX
					</Typography>
				</Box>
				<Box className="flex gap-4 mr-8 items-center">
					<div className="flex items-center  gap-2 bg-white/10 rounded-full px-4 py-2 transition-all">
						<SearchIcon />
						<InputBase
							size="small"
							name="search"
							placeholder="Search…"
							className="text-white w-20 transition-all"
							sx={{
								'&.Mui-focused': {
									width: "20ch !important" ,
								}
							}}
						/>
					</div>
					{session?.user && (
						<Avatar
							alt={session.user?.name as string}
							src={session.user?.image as string}
						/>
					)}
					{session ? (
						<Button color="inherit" onClick={() => signOut()}>
							Logout
						</Button>
					) : (
						<Button color="inherit" onClick={() => signIn()}>
							Login
						</Button>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
