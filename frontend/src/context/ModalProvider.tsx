import { createContext, ReactNode, useContext, useState } from "react";
import ModalWrapper from "../components/Modals";

const ModalProviderContext = createContext<any>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModalDisplay = (messages: string[]) => {
    setModal(<ModalWrapper messages={messages} />);
  };

  const closeModalDisplay = () => {
    setModal(null);
  };

  return (
    <ModalProviderContext.Provider
      value={{ openModalDisplay, closeModalDisplay }}
    >
      {children}
      {modal}
    </ModalProviderContext.Provider>
  );
};

export const useModal = () => useContext(ModalProviderContext);

export default ModalProvider;
