import { AppContextProvider } from "./context";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};
