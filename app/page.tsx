"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
	const user = useSelector((state: RootState) => state.user.name);
	const { push } = useRouter();
	return (
		<>
			<main>
				<Box className="flex flex-col items-center justify-center w-[100vw]">
					<Image
						src="/assets/logo_dark.png"
						alt="hero"
						width={300}
						height={300}
					/>
					<h1>PIX</h1>
					<p className="w-[50vw] text-center">
						The ultimate social networking platform that empowers you to connect
						with friends, share your life's moments, and explore a world of
						endless possibilities.
					</p>
					<Button onClick={() => signIn()}>Sign in with PIX</Button>
					<Button
						onClick={() => {
							push("/signup");
						}}
					>
						Sign Up
					</Button>
					<Button
						onClick={async () => {
							await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/follow/20`);
						}}
					>
						click to check routes
					</Button>
				</Box>
			</main>
		</>
	);
}
