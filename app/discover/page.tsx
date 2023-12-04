"use client"
import AllUsers from "@/components/AllUsers";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { getFollowers, getFollowings } from "@/lib/getFunctions";
import { setFollowers, setFollowing } from "@/lib/redux/slices/user/userSlice";
import { useDispatch } from "react-redux";
function Discover() {
	const dispatch = useDispatch();
	useEffect(() => {
		getFollowers()
			.then((res) => dispatch(setFollowers({ followers: res })))
			.catch((err) => console.log(err));
		getFollowings()
			.then((res) => dispatch(setFollowing({ following: res })))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="">
            <Navbar />
			<AllUsers />
		</div>
	);
}

export default Discover;
