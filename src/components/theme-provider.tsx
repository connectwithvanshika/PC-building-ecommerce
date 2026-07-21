"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: undefined,
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  const [theme, setThemeState] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") || "light";
    setThemeState(stored);
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    window.localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
