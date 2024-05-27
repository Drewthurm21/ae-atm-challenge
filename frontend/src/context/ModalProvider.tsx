import { createContext, ReactNode, useContext, useState } from "react";
import ModalWrapper from "../components/Modals";

const ModalProviderContext = createContext<any>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const setModalContent = () => {
    setModal(<ModalWrapper />);
  };

  const closeModalDisplay = () => {
    setModal(null);
  };

  return (
    <ModalProviderContext.Provider
      value={{ setModalContent, closeModalDisplay }}
    >
      {children}
      {modal}
    </ModalProviderContext.Provider>
  );
};

export const useModal = () => useContext(ModalProviderContext);

export default ModalProvider;
