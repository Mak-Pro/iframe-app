"use client";
import React, { createContext, useState, useEffect } from "react";

type Counter = "increment" | "decrement";

const AppContext = createContext({
  counter: 0,
  handleCounter: (type: Counter): void => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [counter, setCounter] = useState(0);
  const handleCounter = (type: Counter) => {
    type === "decrement" && setCounter((c) => (c > 0 ? c - 1 : c));
    type === "increment" && setCounter((c) => c + 1);
  };
  return (
    <AppContext.Provider value={{ counter, handleCounter }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
