"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface RegistryContextType {
  state: string | null;
  setState: (value: string) => void;
}

const RegistryContext = createContext<RegistryContextType | undefined>(
  undefined
);

export const RegistryProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<string | null>(null);

  return (
    <RegistryContext.Provider value={{ state, setState }}>
      {children}
    </RegistryContext.Provider>
  );
};

export const useRegistry = () => {
  const context = useContext(RegistryContext);
  if (!context) {
    throw new Error("useRegistry must be used within a RegistryProvider");
  }
  return context;
};
