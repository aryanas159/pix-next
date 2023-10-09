import React from "react";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "PIX",
    description: "Social media app for sharing photos",
}
function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }
) {
	return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export default RootLayout;
