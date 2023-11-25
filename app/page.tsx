import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
export default async function Home() {

	const session = await getServerSession();
	if (!session) {
		return redirect("/login");
	}
	return redirect("/feed");
	return (
		<>
			<main>PIX</main>
		</>
	);
}
