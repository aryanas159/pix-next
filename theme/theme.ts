import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2A4494",
        },
        background:{
            default: "#fff",
        }
    },
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    }
});

export default theme;
