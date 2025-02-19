import React, { createContext, useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const storedTheme = localStorage.getItem("darkMode") === "true";

  const [toggleDark, setToggleDark] = useState(storedTheme);

  const myTheme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light", 
    },
  });

  useEffect(() => {
    if (toggleDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [toggleDark]);

  return (
    <ThemeContext.Provider value={{ toggleDark, setToggleDark }}>
      <ThemeProvider theme={myTheme}>
        <CssBaseline /> 
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const DarkModeToggle = () => {
  const { toggleDark, setToggleDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setToggleDark((prev) => !prev)}
      className="text-3xl p-2 transition-all"
    >
      {toggleDark ? (
        <FaToggleOn className="text-blue-500" />
      ) : (
        <FaToggleOff className="text-gray-500" />
      )}
    </button>
  );
};
