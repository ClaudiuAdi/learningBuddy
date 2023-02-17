import useAuthContext from "./useAuthContext";
import useSessionsContext from "./useSessionsContext";

function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: sessionsDispatch } = useSessionsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout function
    dispatch({ type: "LOGOUT" });
    sessionsDispatch({ type: "SET_SESSIONS", payload: null });
  };

  return { logout };
}

export default useLogout;
