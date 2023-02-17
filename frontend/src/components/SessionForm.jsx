import React, { useState } from "react";
import useSessionsContext from "../hooks/useSessionsContext";
import useAuthContext from "../hooks/useAuthContext";

function SessionForm() {
  const { dispatch } = useSessionsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [breaks, setBreaks] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const titleHandler = function (e) {
    setTitle(e.target.value);
  };

  const hoursHandler = function (e) {
    setHours(e.target.value);
  };

  const breaksHandler = function (e) {
    setBreaks(e.target.value);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const session = { title, hours, breaks };

    const response = await fetch("/api/sessions", {
      method: "POST",
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setHours("");
      setBreaks("");
      setError(null);
      setEmptyFields([]);
      console.log("new session added");
      dispatch({ type: "CREATE_SESSION", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new session</h3>

      <label>Session title:</label>
      <input
        type="text"
        onChange={titleHandler}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Session hours:</label>
      <input
        type="number"
        onChange={hoursHandler}
        value={hours}
        className={emptyFields.includes("hours") ? "error" : ""}
      />

      <label>Session breaks:</label>
      <input
        type="number"
        onChange={breaksHandler}
        value={breaks}
        className={emptyFields.includes("breaks") ? "error" : ""}
      />

      <button>Add Session</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default SessionForm;
