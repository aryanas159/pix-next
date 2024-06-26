"use client";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import LoginForm from "@/components/LoginForm";
import LoginGreeting from "@/components/LoginGreeting";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
export default function Login() {
	const searchParams = useSearchParams();
	useEffect(() => {
		const err = searchParams.get("error");
		if (err) {
			toast.error("Please check your credentials");
		}
	}, []);
	return (
		<main
			className="w-screen h-screen flex items-center justify-center transition-all overflow-auto"
			style={{
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
				className="bg-white/10 ml-1 xs:p-4 sm:p-8 rounded-2xl w-[90vw] sm:w-[80vw] md:w-[70vw] flex xs:flex-col sm:flex-row"
				sx={{
					backdropFilter: "blur(15px)",
				}}
			>
				<Grid item xs={12} sm={6} className="flex items-center">
					<LoginGreeting />
				</Grid>
				<Grid item xs={12} sm={6} className="flex items-center justify-center">
					<LoginForm />
				</Grid>
			</Grid>
		</main>
	);
}
