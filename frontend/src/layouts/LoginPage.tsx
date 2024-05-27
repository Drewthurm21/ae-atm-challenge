import { useState } from "react";
import { useModal } from "../context/ModalProvider";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { setModalContent } = useModal();
  const { loginUser, logoutUser } = useAuth();
  const [loginFormData, setLoginFormData] = useState({ account_id: "" });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const sendLoginRequest = async () => {
    await loginUser(+loginFormData.account_id);
  };

  const ModalContent = () => (
    <div className="flex flex-col w-60 h-60 bg-black text-white">
      <h1> ModalContent </h1>
      <div> Other stuff</div>
      <input type="text" placeholder="input" />
    </div>
  );

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        name="account_id"
        placeholder="Account ID"
        value={loginFormData.account_id}
        onChange={handleFormUpdate}
      />
      <button onClick={sendLoginRequest}>Login</button>
      <button onClick={logoutUser}>logout</button>
      <button onClick={() => setModalContent(<ModalContent />)}>
        open modal
      </button>
      <button onClick={() => setModalContent(null)}>close modal</button>
    </div>
  );
}
