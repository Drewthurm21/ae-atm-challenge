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
      <div>USER</div>
      {user && (
        <>
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.account_ids}</div>
          <div onClick={handleLogout}>CLICK ME TO LOGOUT</div>
        </>
      )}
    </>
  );
}
export default App;
