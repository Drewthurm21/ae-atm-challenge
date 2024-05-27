import { createContext, ReactNode, useContext, useState } from "react";

const ModalProviderContext = createContext<any>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const setModalContent = (content: ReactNode | null) => {
    setModal(content);
  };

  const closeModalDisplay = () => {
    setModal(null);
  };

  const ModalWrapper = () =>
    modal && (
      <div
        onClick={() => setModalContent(null)}
        className="absolute top-0 left-0 w-full h-full bg-modal-overlay backdrop-blur-xl opacity-70 bg-repeat"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative top-1/3 left-1/3 w-[40vw] h-[40vh] justify-center items-center"
        >
          {modal}
        </div>
      </div>
    );

  return (
    <ModalProviderContext.Provider
      value={{ setModalContent, closeModalDisplay }}
    >
      {children}
      <ModalWrapper />
    </ModalProviderContext.Provider>
  );
};

export const useModal = () => useContext(ModalProviderContext);

export default ModalProvider;
