import { createContext, ReactNode, useContext, useState } from "react";
import { MessageModalWrapper, ConfirmationModal } from "../components/Modals";

const ModalProviderContext = createContext<any>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModalDisplay = () => {
    setModal(<MessageModalWrapper />);
  };

  const closeModalDisplay = () => {
    setModal(null);
  };

  const openConfirmModal = (confirmCb: any) => {
    setModal(
      <ConfirmationModal closeModal={closeModalDisplay} confirmCb={confirmCb} />
    );
  };

  return (
    <ModalProviderContext.Provider
      value={{ openConfirmModal, openModalDisplay, closeModalDisplay }}
    >
      {children}
      {modal}
    </ModalProviderContext.Provider>
  );
};

export const useModal = () => useContext(ModalProviderContext);

export default ModalProvider;
