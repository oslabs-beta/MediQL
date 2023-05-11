import React, { useEffect, useState } from "react";
import "./App.Styles.scss";
import "./components/TreeDiagram/TreeDiagramStyles.scss";
import "./components/DisplayGraphiql/DisplayGraphiql.scss";

import Navbar from "./components/NavBar/navbar";
import Visualizer from "./components/Visualizer/Visualizer";
import DisplayGraphiql from "./components/DisplayGraphiql/DisplayGraphiql";
import { PortContextProvider } from "./contextStore/port-context";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("background-color") || "light"
  );

  useEffect(() => {
    const body = document.body;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === "class") {
          const isDarkMode = body.classList.contains("graphiql-dark");
          const newTheme = isDarkMode ? "dark" : "light";
          setTheme(newTheme);
          localStorage.setItem("background-color", newTheme);
        }
      }
    });

    observer.observe(body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.style.setProperty("--app-background-color", "hsl(219, 29%, 18%)");
    } else {
      document.documentElement.style.setProperty("--app-background-color", "hsl(219, 28%, 100%)");
    }
  }, [theme]);

  return (
    <div className="app">
      <PortContextProvider>
        <Navbar theme={theme}/>
        <div className="mainDiv">
          <DisplayGraphiql />
          <Visualizer />
        </div>
      </PortContextProvider>
    </div>
  );
}

export default App;
