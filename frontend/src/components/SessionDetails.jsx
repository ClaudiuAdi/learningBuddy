import React from "react";
import useSessionsContext from "../hooks/useSessionsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function SessionDetails(props) {
  const { dispatch } = useSessionsContext();

  const handleClick = async () => {
    const response = await fetch(`/api/sessions/${props.session._id}`, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SESSION", payload: json });
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
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}

export default SessionDetails;
