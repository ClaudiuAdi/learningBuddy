import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";

function useSessionsContext() {
  const context = useContext(SessionContext);
  if (!context) {
    throw Error(
      "useSessionsContext must be used inside an SessionsContextProvider"
    );
  }

  return context;
}

export default useSessionsContext;
