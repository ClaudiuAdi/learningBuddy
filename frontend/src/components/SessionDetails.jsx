import React, { useContext, useState } from "react";
import useSessionsContext from "../hooks/useSessionsContext";
import { SessionContext } from "../context/SessionContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function SessionDetails(props) {
  const { dispatch } = useContext(SessionContext);
  // const { dispatch } = useSessionsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [tempSession, setTempSession] = useState(null);
  const [changed, setChanged] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`/api/sessions/${props.session._id}`, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SESSION", payload: json });
    }
  };

  const handleEdit = () => {
    setTempSession(props.session);
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(tempSession);
    const response = await fetch(`/api/sessions/${props.session._id}`, {
      method: "PUT",
      body: JSON.stringify(tempSession),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      setChanged(false);
      setIsEditing(false);
      dispatch({ type: "EDIT_SESSION", payload: json });
      // dispatch({ type: "SET_SESSIONS", payload: json });
    }
  };

  return (
    <div className="session-details">
      <h4>{props.session.title}</h4>
      <p>
        <strong>Hours: </strong>
        {props.session.hours}
      </p>
      <p>
        <strong>Breaks: </strong>
        {props.session.breaks}
      </p>
      <p>
        {formatDistanceToNow(new Date(props.session.createdAt), {
          addSuffix: true,
        })}
      </p>
      <div className="functional-buttons">
        <span
          className="material-symbols-outlined edit-button"
          onClick={handleEdit}
        >
          edit
        </span>
        <span
          className="material-symbols-outlined delete-button"
          onClick={handleDelete}
        >
          delete
        </span>
        {/* {isEditing && (
          <div>
            <input
              type="text"
              value={tempSession.title}
              onChange={(e) => {
                setChanged(true);
                setTempSession({
                  ...tempSession,
                  title: e.target.value,
                });
              }}
            />
            <input
              type="number"
              value={tempSession.hours}
              onChange={(e) => {
                setChanged(true);
                setTempSession({
                  ...tempSession,
                  hours: e.target.value,
                });
              }}
            />
            <input
              type="number"
              value={tempSession.breaks}
              onChange={(e) => {
                setChanged(true);
                setTempSession({
                  ...tempSession,
                  breaks: e.target.value,
                });
              }}
            />
            {changed ? (
              <>
                <button onClick={handleSave}>Save</button>
                <button
                  onClick={(e) => {
                    setTempSession({ ...props.session });
                    setChanged(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : null}
          </div>
        )} */}
        {isEditing && (
          <form className="edit" onSubmit={handleSave}>
            <label>Session title:</label>
            <input
              type="text"
              onChange={(e) => {
                setChanged(true);
                setTempSession({
                  ...tempSession,
                  title: e.target.value,
                });
              }}
              value={tempSession.title}
            />

            <label>Session hours:</label>
            <input
              type="number"
              onChange={(e) => {
                setChanged(true);
                setTempSession({
                  ...tempSession,
                  hours: e.target.value,
                });
              }}
              value={tempSession.hours}
            />

            <label>Session breaks:</label>
            <input
              type="number"
              onChange={(e) => {
                setChanged(true);
                setTempSession({
                  ...tempSession,
                  breaks: e.target.value,
                });
              }}
              value={tempSession.breaks}
            />

            <button onClick={handleSave}>Save Session</button>
            <button>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SessionDetails;
