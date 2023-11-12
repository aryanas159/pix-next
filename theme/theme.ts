import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#72DDF7",
        },
        background:{
            default: "#000",
        }
    },
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    }
});

export default theme;
