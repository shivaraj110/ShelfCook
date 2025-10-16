import { createContext, useContext, useState, type ReactNode } from "react";

type CameraContextType = {
  isCameraOpen: boolean;
  setIsCameraOpen: (isOpen: boolean) => void;
};

export const CameraContext = createContext<CameraContextType>({
  isCameraOpen: false,
  setIsCameraOpen: () => {},
});

export function useCameraContext() {
  return useContext(CameraContext);
}

export function CameraProvider({ children }: { children: ReactNode }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <CameraContext.Provider value={{ isCameraOpen, setIsCameraOpen }}>
      {children}
    </CameraContext.Provider>
  );
}