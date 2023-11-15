import SignupForm from "@/components/SignupForm";
import { Container, Grid, Typography, Box } from "@mui/material";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
const page = () => {
	return (
		<Box
			className="w-screen h-screen flex items-center justify-center transition-all"
			sx={{
				backgroundImage: "url('assets/bg.jpg')",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundOrigin: "center center",
				backgroundAttachment: "fixed",
			}}
		>
			<Toaster />
			<Grid
				container
				className="xs:w-[90vw] sm:w-[80vw] bg-white/10 rounded-2xl shadow-2xl flex xs:flex-col sm:flex-row xs:p-2 sm:p-4"
				sx={{
					backdropFilter: "blur(15px)",
				}}
			>
				<Grid
					item
					xs={12}
					sm={6}
					className="flex flex-col items-center gap-4 p-4 justify-center"
				>
					<Image
						src="/assets/logo_light.png"
						alt="PIX"
						width={250}
						height={250}
						className="xs:w-[100px] xs:h-[100px] sm:w-[250px] sm:h-[250px]"
					/>
					<Typography
						align="center"
						className="text-[1.6rem] md:text-[2rem] text-black font-semibold font-Poppins"
					>
						Welcome to PIX
					</Typography>
					<Typography
						align="center"
						lineHeight={2}
						paragraph
						className="xs:text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] text-black font-medium font-Poppins xs:hidden sm:block"
					>
						The ultimate social networking platform that empowers you to connect
						with friends, share your life's moments, and explore a world of
						endless possibilities.
					</Typography>
					<Typography className="xs:text-xs sm:text-sm text-black">
						Already have an account ?{" "}
						<Link href="/login" className="text-light">
							Login
						</Link>
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
		</Box>
	);
};

export default page;
