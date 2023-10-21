import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Userstate {
	name: string;
	email: string;
	imageUrl: string;
	followers: Array<User>;
	following: Array<User>;
}

const initialState: Userstate = {
	name: "",
	email: "",
	imageUrl: "",
	followers: [],
	following: [],
};
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<Userstate>) => {
			const { name, email, imageUrl } = action?.payload;
			state.name = name;
			state.email = email;
			state.imageUrl = imageUrl;
		},
		setFollowers: (
			state,
			action: PayloadAction<{ followers: Array<User> }>
		) => {
			const { followers } = action.payload;
            state.followers = followers;
		},
		setFollowing: (
			state,
			action: PayloadAction<{ following: Array<User> }>
		) => {
			const { following } = action.payload;
            state.following = following;
		},
	},
});

export const { setUser, setFollowers, setFollowing } = userSlice.actions;
export default userSlice.reducer;
