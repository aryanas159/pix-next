"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
function MobileMenu() {
	const linkClasses = "p-2 text-white no-underline h-[36px] text-sm";
	const { data: session } = useSession();
	return (
		<>
			<Link href="/feed" className={linkClasses}>
				<div className="flex items-center gap-2">
					<Image 
						src="/assets/home.svg"
						alt="Home"
						width={16}
						height={16}
					/>
					Home
				</div>
			</Link>
			{session?.user && (
				<Link href={`/user/${session.user.id}`} className={linkClasses}>
					<div className="flex items-center gap-2">
					<Image 
						src="/assets/user.svg"
						alt="profile"
						width={16}
						height={16}
					/>
					My Profile
				</div>
				</Link>
			)}
			<Link href="/chat" className={linkClasses + " relative"}>
			<div className="absolute left-1 flex items-center gap-[6px]">
					<img 
						src="/assets/chat.svg"
						alt="chat"
						width={24}
					/>
					PIX Chat
				</div>
			</Link>
			<Link href="/discover" className={linkClasses + " relative"}>
			<div className="absolute left-1 flex items-center gap-[8px]">
					<img 
						src="/assets/discovery.svg"
						alt="discover"
						width={20}
					/>
					Discover
				</div>
			</Link>
			<div className={linkClasses} onClick={() => signOut({callbackUrl: "/login"})}>
			<div className="flex items-center gap-2">
					<Image 
						src="/assets/logout.svg"
						alt="logout"
						width={16}
						height={16}
					/>
					Logout
				</div>
			</div>
		</>
	);
}

export default MobileMenu;
