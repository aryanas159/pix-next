import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        background:{
            default: "#fff",
        }
    },
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    }
});

export default theme;
