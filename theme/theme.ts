import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    }
});

export default theme;
