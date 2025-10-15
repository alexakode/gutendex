import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import theme from "./theme";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Create a theme instance with the correct mode
  const activeTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
