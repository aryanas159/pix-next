import { Box } from "@mui/material";
import Image from "next/image";
function UserTyping() {
    const spanClasses = "h-[10px] w-[10px] bg-black absolute left-0 top-0 rounded-full animate-blink"
	return (
		<Box className="flex
            flex-row"
        >
			<div className="relative bg-purple">
                <span className={`${spanClasses}`}></span>
                <span className={`${spanClasses} ml-4 animation-delay-100`}></span>
                <span className={`${spanClasses} ml-8 animation-delay-200`}></span>
            </div>
		</Box>
	);
}

export default UserTyping;
