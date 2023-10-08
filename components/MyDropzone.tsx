"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface MyDropzoneProps {
	image: Blob | null;
	setImage: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const MyDropzone = ({ image, setImage }: MyDropzoneProps) => {
	const onDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			setImage(acceptedFiles[0]);
			console.log(image);
		}
	};
	const getImageUrl = (image: Blob) => {
		return URL.createObjectURL(image);
	};
	return (
		<Dropzone onDrop={onDrop}>
			{({ getRootProps, getInputProps, isDragActive, open }) => (
				<section className="p-4 border-dashed border cursor-pointer">
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						{isDragActive ? (
							<Typography variant="h5">Drop the files here ...</Typography>
						) : (
							<Box className="flex g-2 items-center">
								{image ? (
									image.name
								) : (
									<>
										<AddIcon />
										<Typography>Upload a profile picture</Typography>
									</>
								)}
							</Box>
						)}
					</div>
				</section>
			)}
		</Dropzone>
	);
};

export default MyDropzone;
