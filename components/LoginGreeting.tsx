import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
export default function LoginGreeting() {
	return (
		<Box className="flex flex-col gap-4 items-center">
			<Image src="/assets/logo_light.png" alt="PIX" width={250} height={250} />
			<Typography
				align="center"
				className="text-[1.2rem] md:text-[1.4rem] text-dark font-semibold font-Poppins"
			>
				Welcome back to PIX!
			</Typography>
			<Typography
				align="center"
				paragraph
				className="text-[0.9rem] md:text-[1rem] text-primary-text font-medium font-Poppins"
			>
				Log in and reconnect with your friends and memories. Let the good times
				roll! 🎉
			</Typography>
			<Typography className="text-sm">
				Don't have an account ?{" "}
				<Link href="/signup" className="text-light">
					Register
				</Link>
			</Typography>
		</Box>
	);
}
