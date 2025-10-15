import { createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

// Function to try getting system accent color
const getSystemAccent = () => {
  try {
    const temp = document.createElement("div");
    temp.style.color = "AccentColor";
    document.body.appendChild(temp);
    const color = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    return color !== "AccentColor" ? color : null;
  } catch (e) {
    return null;
  }
};

const defaultAccent = blue[500]; // Fallback color in hex/rgb
const systemAccent = getSystemAccent() || defaultAccent;

const theme = createTheme({
  palette: {
    mode: "light", // We'll toggle this dynamically in App.jsx
    primary: {
      main: systemAccent,
      light: blue[300],
      dark: blue[700],
      contrastText: "#fff",
    },
    secondary: {
      main: blue[500],
      light: blue[300],
      dark: blue[700],
      contrastText: "#fff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    error: {
      main: "#d32f2f",
      contrastText: "#fff",
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  typography: {
    h1: {
      fontSize: "clamp(2rem, 5vw, 3rem)",
    },
    h2: {
      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
    },
    body1: {
      fontSize: "clamp(1rem, 2vw, 1.2rem)",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.25rem",
        },
      },
    },
  },
});

export default theme;
