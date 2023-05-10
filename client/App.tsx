import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import "./App.Styles.scss";
import "./components/TreeDiagram/TreeDiagramStyles.scss";
import "./components/DisplayGraphiql/DisplayGraphiql.scss";

import Navbar from './components/NavBar/navbar';
import Visualizer from "./components/Visualizer/Visualizer";
import DisplayGraphiql from "./components/DisplayGraphiql/DisplayGraphiql";
import { PortContextProvider } from "./contextStore/port-context";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div className="toggle-container">
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </div>
  );
}

export default function App() {

  const [mode, setMode] = React.useState<"light" | "dark">(
    () => (localStorage.getItem("color-mode") as "light" | "dark") || "light"
  );

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("color-mode", newMode);
      },
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  React.useEffect(() => {
    document.body.style.backgroundColor =
      mode === "dark" ? "hsl(219, 29%, 18%)" : "hsl(219, 28%, 100%)";
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <PortContextProvider>
          <Navbar />
          <MyApp />
          <div className="mainDiv">
            <DisplayGraphiql />
            <Visualizer />
          </div>
        </PortContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
