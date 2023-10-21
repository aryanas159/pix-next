"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PostImageUploadDropzone from "@/components/PostImageUploadDropzone";
import uploadImage from "@/lib/uploadImage";
import axios from "axios";
import {
	TextField,
	Box,
	useTheme,
	IconButton,
	Button,
	Typography,
	CircularProgress,
} from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
function CreatePost({
	setPosts,
}: {
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
	const { data: session } = useSession();
	const [postContent, setPostContent] = useState("");
	const [image, setImage] = useState<Blob | null>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	useEffect(() => {
		if (image) {
			const url = URL.createObjectURL(image);
			setImageUrl(url);
		}
	}, [image]);
	const handlePost = async () => {
		try {
			setLoading(true);
			const formData = new FormData();
			if (image) {
				formData.append("upload_preset", "my_unsigned_preset");
				formData.append("file", image);
				const { secure_url } = await uploadImage(formData);
				if (!secure_url) {
					setError("Error uploading image");
					return;
				}
				formData.delete("upload_preset");
				formData.delete("file");
				formData.append("imageUrl", secure_url);
			}
			if (postContent) {
				formData.append("content", postContent);
			}
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
				formData
			);
			setPosts((prev) => {
				return [res.data.post, ...prev]
			})
			setImage(null);
			setImageUrl(null);
			setLoading(false);
			setPostContent("");
		} catch (error) {
			console.log(error);
			setError("Something went wrong");
			setLoading(false);
		}
	};
	return (
		<Box className="flex flex-col p-6 rounded-2xl w-[40vw] gap-4 bg-white shadow-sm">
			<Box className="flex flex-row items-center justify-center gap-4">
				<UserAvatar
					userName={(session && session.user.name) || ""}
					imageUrl={(session && session.user.image) || ""}
				/>
				<TextField
					variant="outlined"
					multiline={true}
					placeholder="What's on your mind?"
					fullWidth
					value={postContent}
					onChange={(e) => setPostContent(e.target.value)}
					sx={{
						"& .MuiInputBase-root": {
							borderRadius: "40px",
						},
						"& .css-ef9o8m-MuiInputBase-input-MuiOutlinedInput-input": {
							fontWeight: "400",
						},
					}}
					inputProps={{
						sx: {
							padding: "0px",
						},
					}}
				/>
			</Box>
			<Box className="flex flex-row justify-between items-center">
				<PostImageUploadDropzone image={image} setImage={setImage} />
				<Button
					variant="contained"
					className="rounded-2xl bg-light text-white"
					onClick={handlePost}
					disabled={(!postContent && !image) || loading}
				>
					{loading && <CircularProgress size={18} className="mr-4" />}
					Post
				</Button>
			</Box>
			{imageUrl && (
				<Box className="transition-all">
					<img
						src={imageUrl}
						width={300}
						alt="Preview"
						className="rounded-2xl"
					/>
				</Box>
			)}
		</Box>
	);
}

export default CreatePost;
