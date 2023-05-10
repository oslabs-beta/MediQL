import React, { useEffect } from "react";
import "./App.Styles.scss";
import "./components/TreeDiagram/TreeDiagramStyles.scss";
import "./components/DisplayGraphiql/DisplayGraphiql.scss";

import Navbar from "./components/NavBar/navbar";
import Visualizer from "./components/Visualizer/Visualizer";
import DisplayGraphiql from "./components/DisplayGraphiql/DisplayGraphiql";
import { PortContextProvider } from "./contextStore/port-context";

function App() {
  useEffect(() => {
    const body = document.body;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === "class") {
          const isDarkMode = body.classList.contains("graphiql-dark");
          if (isDarkMode) {
            document.documentElement.style.setProperty(
              "--app-background-color",
              "hsl(219, 29%, 18%)"
            );
            localStorage.setItem("background-color", "dark");
          } else {
            document.documentElement.style.setProperty(
              "--app-background-color",
              "hsl(219, 28%, 100%)"
            );
            localStorage.setItem("background-color", "light");
          }
        }
      }
    });

    observer.observe(body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Restore the background color on page load
  useEffect(() => {
    const savedBackgroundColor = localStorage.getItem("background-color");
    if (savedBackgroundColor === "dark") {
      document.body.classList.add("graphiql-dark");
    }
  }, []);

  return (
    <div className="app">
      <PortContextProvider>
        <Navbar />
        <div className="mainDiv">
          <DisplayGraphiql />
          <Visualizer />
        </div>
      </PortContextProvider>
    </div>
  );
}

export default App;
