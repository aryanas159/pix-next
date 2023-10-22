"use client"
import React from "react";
import SignupForm from "@/components/SignupForm";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
const page = () => {
	const router = useRouter();
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
			<Grid
				container
				className="w-[90vw] sm:w-[80vw] md:w-[70vw] bg-transparent rounded-2xl shadow-2xl flex flex-col md:flex-row p-4 "
				sx={{
					backdropFilter: "blur(10px)",
				}}
			>
				<Grid
					item
					xs={12}
					sm={6}
					direction="column"
					className="flex items-center gap-4 p-4 justify-center"
				>
					<Image
						src="/assets/logo_light.png"
						alt="PIX"
						width={250}
						height={250}
					/>
					<Typography
						align="center"
						className="text-[1.6rem] md:text-[2rem] text-dark font-semibold font-Poppins"
					>
						Welcome to PIX
					</Typography>
					<Typography
						align="center"
						lineHeight={2}
						paragraph
						className="text-[0.9rem] md:text-[1rem] text-black font-medium font-Poppins"
					>
						The ultimate social networking platform that empowers you to connect
						with friends, share your life's moments, and explore a world of
						endless possibilities.
					</Typography>
					<Typography className="text-sm">
							Already have an account ?{" "}
							<Button size="small" onClick={() => {
								router.push("/login")
							}}>
								Login
							</Button>
						</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					className="flex items-center justify-center p-4"
				>
					<SignupForm />
				</Grid>
			</Grid>	
		</Container>
	);
};

export default page;
