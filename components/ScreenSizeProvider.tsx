import { createContext, useContext, PropsWithChildren } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";

export const ScreenSizeContext = createContext<{
  isSmall: boolean;
  height: number;
  width: number;
}>({
  isSmall: false,
  height: 0,
  width: 0,
});

export const ScreenSizeProvider = ({ children }: PropsWithChildren) => {
  const size = useScreenSize();
  return (
    <ScreenSizeContext.Provider value={size}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSizeContext = () => useContext(ScreenSizeContext);
