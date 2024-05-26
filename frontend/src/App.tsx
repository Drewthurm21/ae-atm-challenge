import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store/store.ts";
import { loginUser, logoutUser } from "./store/userSlice.ts";

function App() {
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.userData.user);
  const status = useSelector(
    (state: RootState) => state.userData.loadingStatus
  );

  useEffect(() => {
    dispatch(loginUser(1));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error occurred while logging in</div>;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      {user && (
        <div className="flex flex-col w-full h-[100vh] items-center justify-center">
          <div>USER</div>
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.account_ids}</div>
          <div onClick={handleLogout}>CLICK ME TO LOGOUT</div>
        </div>
      )}
    </>
  );
}
export default App;
