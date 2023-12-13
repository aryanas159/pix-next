import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
export default async function Home() {
	const session = await getServerSession();
	// if (!session) {
	// 	return redirect("/login");
	// }
	// return redirect("/feed");
	return (
		<div className="flex w-screen h-screen items-center justify-center">
			<p className="text-xl font-semibold w-1/2 text-center">
			Hello there 😎. 
			Thank you for clicking on this link, the Website has been taken down now,
			because I didn't want to pay for the server anymore.
			Anyways I hope you have a great day! 🥳
			</p>
		</div>
	);
}
