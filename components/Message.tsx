import { Box, Typography } from "@mui/material";
type MessageProps = {
	message: string;
	isSender: boolean;
	imageUrl?: string;
};
function Message({ message, isSender, imageUrl }: MessageProps) {
	return (
		<Box className={`flex flex-col items-${isSender ? "end" : "start"}`}>
			<div
				className={`flex flex-col items-start gap-2 p-2 rounded-2xl ${
					isSender ? "bg-light text-white" : "bg-black text-white"
				}`}
			>
				{imageUrl && (
					<a href={imageUrl} target="_blank">
						<img src={imageUrl} className="w-[300px]" alt="Image" />
					</a>
				)}
				<Typography
				// className={`p-2 rounded-2xl ${
				// 	isSender ? "bg-light text-white" : "bg-black text-white"
				// }`}
				>
					{message}
				</Typography>
			</div>
		</Box>
	);
}

export default Message;
