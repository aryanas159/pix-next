"use client"
import React, {useState} from "react";
import type { GetServerSidePropsContext } from "next";
import { TextField, Box, Button } from "@mui/material";
import {
	getProviders,
	getSession,
	getCsrfToken,
	signIn,
} from "next-auth/react";

type Provider = {
	id: string,
    name: string,
    type: string,
    signinUrl: string,
    callbackUrl: string
}

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	return (
		<>
			<Box 
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					width: "100vw",
				}}
			>
				<TextField 
					variant="outlined"
					value={email}
					onChange={e => setEmail(e.target.value)}
					name="Email"
					id="email"
				/>
				<TextField 
					variant="outlined"
					value={password}
					onChange={e => setPassword(e.target.value)}
					name="Password"
					id="password"
				/>
				<Button 
					variant="contained"
					onClick={() => signIn("credentials", {email, password, callbackUrl: "/feed"})}
				>
					Sign in with PIX
				</Button>
				<Button 
					variant="outlined"
					onClick={() => signIn("google", {callbackUrl: "/feed"})}
				>
					Sign in with Google
				</Button>
			</Box>
		</>
	);
}

