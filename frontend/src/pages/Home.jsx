import React from "react";
import { useEffect } from "react";

// components
import SessionDetails from "../components/SessionDetails";
import SessionForm from "../components/SessionForm";
import useSessionsContext from "../hooks/useSessionsContext";
import useAuthContext from "../hooks/useAuthContext";

function Home() {
  const { sessions, dispatch } = useSessionsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await fetch("/api/sessions", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SESSIONS", payload: json });
      }
    };

    if (user) {
      fetchSessions();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="sessions">
        {sessions &&
          sessions.map((session) => (
            <SessionDetails key={session._id} session={session} />
          ))}
      </div>
      <SessionForm />
    </div>
  );
}

export default Home;
