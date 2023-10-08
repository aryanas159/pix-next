"use client";
import React from "react";
import { store } from "@/lib/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
const Providers = (props: React.PropsWithChildren) => {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>{props.children}</Provider>
		</ThemeProvider>
	);
};
export default Providers;
