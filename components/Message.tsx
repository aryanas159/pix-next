import { Box, Typography } from "@mui/material";
type MessageProps = {
	message: string;
	isSender: boolean;
};
function Message({ message, isSender }: MessageProps) {
	return (
		<Box className={`flex ${
            isSender ? "flex-row-reverse" : "flex-row"
        }`}>
			<Typography
				className={`p-2 rounded-2xl ${
					isSender ? "bg-blue text-dark" : "bg-[#FFFB73]"
				}`}
			>
				{message}
			</Typography>
		</Box>
	);
}

export default Message;
