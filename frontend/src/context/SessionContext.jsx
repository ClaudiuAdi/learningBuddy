import { createContext, useReducer } from "react";

export const SessionContext = createContext();

export const sessionsReducer = function (state, action) {
  switch (action.type) {
    case "SET_SESSIONS":
      return {
        sessions: action.payload,
      };
    case "CREATE_SESSION":
      return {
        sessions: [action.payload, ...state.sessions],
      };
    case "EDIT_SESSION":
      // return {
      //   sessions: [
      //     ...state.sessions.map((session) =>
      //       session._id === action.payload._id ? action.payload : session
      //     ),
      //   ],

      return {
        sessions: state.sessions.map((session) =>
          session._id === action.payload._id ? action.payload : session
        ),
      };

    // return {
    //   sessions: [
    //     ...state.sessions.filter(
    //       (session) => session._id !== action.payload._id
    //     ),
    //     action.payload,
    //   ],
    // };
    case "DELETE_SESSION":
      return {
        sessions: state.sessions.filter(
          (session) => session._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const SessionContextProvider = function (props) {
  const [state, dispatch] = useReducer(sessionsReducer, {
    sessions: null,
  });

  return (
    <SessionContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </SessionContext.Provider>
  );
};
