import React from "react";
import { Avatar } from "@mui/material";
type UserAvatarProps = {
    userName: string;
    imageUrl: string;
    size?: number;
}
function UserAvatar({userName, imageUrl, size}: UserAvatarProps) {
	return <>
        <Avatar 
            alt={userName}
            src={imageUrl}
            sx={{
                width: size ? size : 36,
                height: size ? size : 36,
            }}
        />
    </>;
}

export default UserAvatar;
