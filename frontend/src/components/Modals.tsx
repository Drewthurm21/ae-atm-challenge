import React from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { useModal } from "../context/ModalProvider";
import { AnimatePresence, motion } from "framer-motion";
import { RootState, useAppDispatch } from "../store/store";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { confirmBtnClasses, cancelBtnClasses } from "../styles/styles";
import {
  clearModalMessagingAction as clearMessages,
  clearModalErrorsAction as clearErrors,
} from "../store/messaging/modalMessageReducer";

const BIG_ICON_CLASS =
  "text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24";

interface MessageModalProps {
  errors: string[] | null;
  messages: string[] | null;
  closeModal: React.MouseEventHandler<HTMLDivElement>;
  logoutUser: () => void;
}

export const MessageModalWrapper = () => {
  const dispatch = useAppDispatch();
  const { closeModalDisplay } = useModal();
  const { errors, messages } = useSelector(
    (state: RootState) => state.modalData
  );

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(clearErrors());
    dispatch(clearMessages());
    closeModalDisplay();
  };

  const handleLogout = () => {
    dispatch(clearErrors());
    dispatch(clearMessages());
    window.location.href = "/logout";
  };

  return (
    <MessagingModal
      errors={errors}
      messages={messages}
      closeModal={handleClose}
      logoutUser={handleLogout}
    />
  );
};

const MessagingModal = ({
  closeModal,
  errors,
  messages,
  logoutUser,
}: MessageModalProps) => {
  const msgIndex = Math.floor(Math.random() * 5);
  const ModalIcons = errors
    ? [
        <FiAlertCircle className={BIG_ICON_CLASS} />,
        <FiAlertCircle className="text-red-600" />,
      ]
    : [
        <FiCheckCircle
          className={twMerge(
            BIG_ICON_CLASS,
            "rotate-0 text-[200px] -top-12 -left-12"
          )}
        />,
        <FiCheckCircle className="text-accent" />,
      ];

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
          {ModalIcons[0]}
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
              {ModalIcons[1]}
            </div>
            <h3 className="text-3xl font-bold text-center mb-2">
              {errors ? "Oops! So sorry!" : "Success!"}
            </h3>
            {errors && (
              <>
                <p className="text-center">{useErrorMessage(msgIndex)}</p>
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
            )}
            {messages && (
              <>
                <h3 className="text-3xl font-bold text-center mb-12">
                  {useConfirmMessage(msgIndex)}
                </h3>
                <p className="text-center mb-6">
                  {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                  ))}
                </p>
                {!errors && messages && (
                  <p className="text-center mb-6">
                    Would you like to log out now?
                  </p>
                )}
              </>
            )}
            <div className="flex justify-evenly mt-12">
              <div onClick={closeModal} className={confirmBtnClasses}>
                {errors ? "Understood!" : "No, go back."}
              </div>
              {!errors && messages && (
                <div onClick={logoutUser} className={confirmBtnClasses}>
                  Yes, Log me out!
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const useErrorMessage = (i: number) => negativeMessages[i];
const useConfirmMessage = (i: number) => positiveMessages[i];

const positiveMessages = [
  "Everything is all set!",
  "Thank you for banking with us!",
  "We appreciate your business!",
  "Thanks for choosing us!",
  "We'll see you next time!",
];

const negativeMessages = [
  "Your request was unsuccessful.",
  "Please try again later.",
  "We apologize for any inconvenience.",
  "We might have hit a snag.",
  "Let's try that again.",
];

export const ConfirmationModal = ({
  closeModal,
  confirmCb,
}: {
  closeModal: React.MouseEventHandler<HTMLDivElement>;
  confirmCb: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <FaRegQuestionCircle className={BIG_ICON_CLASS} />
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
              <FaRegQuestionCircle className="text-amber-400" />
            </div>
            <h3 className="text-3xl font-bold text-center mb-2">
              Are you sure?
            </h3>
            <p className="text-center mb-6">Are you sure?</p>
            <div className="flex w-full justify-evenly">
              <div onClick={closeModal} className={cancelBtnClasses}>
                Cancel Transaction
              </div>
              <div onClick={confirmCb} className={confirmBtnClasses}>
                Confirm Transaction
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
