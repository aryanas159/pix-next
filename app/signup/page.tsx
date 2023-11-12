import SignupForm from "@/components/SignupForm";
import { Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
const page = () => {
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
				className="w-[90vw] sm:w-[80vw] md:w-[70vw] bg-bg-light/20 rounded-2xl shadow-2xl flex flex-col md:flex-row p-4 "
				sx={{
					backdropFilter: "blur(15px)",
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
						className="text-[0.9rem] md:text-[1rem] text-primary-text font-medium font-Poppins"
					>
						The ultimate social networking platform that empowers you to connect
						with friends, share your life's moments, and explore a world of
						endless possibilities.
					</Typography>
					<Typography className="text-sm">
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
					className="flex items-center justify-cente p-4"
				>
					<SignupForm />
				</Grid>
			</Grid>
		</Container>
	);
};

export default page;
