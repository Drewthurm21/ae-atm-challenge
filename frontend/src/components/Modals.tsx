import { useSelector } from "react-redux";
import { useModal } from "../context/ModalProvider";
import { AnimatePresence, motion } from "framer-motion";
import { RootState, useAppDispatch } from "../store/store";
import { clearModalMessagingAction as clearErrors } from "../store/messaging/modalMessageReducer";

type ModalProps = {
  messages?: string[];
};

export const ModalWrapper = ({ messages }: ModalProps) => {
  const dispatch = useAppDispatch();
  const errors =
    useSelector((state: RootState) => state.errorData.messages) || null;
  const { closeModalDisplay } = useModal();

  return (
    <SpringModal
      errors={errors}
      clearErrors={() => dispatch(clearErrors())}
      messages={messages}
      closeModal={closeModalDisplay}
    />
  );
};

const SpringModal = ({
  closeModal,
  clearErrors,
  errors = null,
  messages = [],
}: {
  closeModal: () => void;
  clearErrors: () => void;
  errors: String[] | null;
  messages?: String[];
}) => {
  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (errors) clearErrors();
    closeModal();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="bg-modal-overlay bg-repeat p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-center mb-2">
              {errors ? "Oops! So sorry!" : "Success!"}
            </h3>
            {errors ? (
              <>
                <p className="text-center mb-6">
                  We've encountered some errors while processing your request.
                </p>
                <p className="text-center mb-6">Here's what went wrong...</p>
                <ul>
                  {errors &&
                    errors.map((error, index) => (
                      <li key={index} className="text-center">
                        {error}
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-center mb-2">
                  {"Thanks for choosing us!"}
                </h3>
                <p className="text-center mb-6">
                  {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                  ))}
                </p>
              </>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleCloseModal}
                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
              >
                Understood!
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalWrapper;
