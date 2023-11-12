import { Box } from "@mui/material";
import Image from "next/image";
function UserTyping() {
	const spanClasses =
		"bg-bg-light h-[6px] w-[6px] bg-black absolute top-3 left-5 rounded-full animate-blink";
	return (
		<Box className="flex p-4 rounded-2xl bg-black relative w-20">
			<span className={`${spanClasses}`}></span>
			<span className={`${spanClasses} ml-4 animation-delay-100`}></span>
			<span className={`${spanClasses} ml-8 animation-delay-200`}></span>
		</Box>
	);
}

export default UserTyping;
