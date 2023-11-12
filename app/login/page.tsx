"use client";
import React, { useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import LoginForm from "@/components/LoginForm";
import LoginGreeting from "@/components/LoginGreeting";
import { Toaster } from "react-hot-toast";
export default function Login() {
	return (
		<Container
			maxWidth="xl"
			className="w-screen h-screen flex items-center justify-center transition-all"
			sx={{
				backgroundImage: "url('assets/bg.jpg')",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundOrigin: "center center",
			}}
		>
			<Toaster />
			<Grid
				container
				spacing={2}
				className="bg-bg-light/20 p-8 rounded-2xl w-[90vw] sm:w-[80vw] md:w-[70vw]"
				sx={{
					backdropFilter: "blur(15px)",
				}}
			>
				<Grid item xs={6} className="flex items-center">
					<LoginGreeting />
				</Grid>
				<Grid item xs={6} className="flex items-center justify-center">
					<LoginForm />
				</Grid>
			</Grid>
		</Container>
	);
}
