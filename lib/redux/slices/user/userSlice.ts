import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Userstate {
	name: string;
	email: string;
	imageUrl: string;
}

const initialState: Userstate = {
	name: "",
	email: "",
	imageUrl: "",
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Userstate>) => {
            const {name, email, imageUrl} = action?.payload
            state.name = name;
            state.email = email
            state.imageUrl = imageUrl
        }
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;