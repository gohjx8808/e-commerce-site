import React, { createContext, useState } from "react";

interface statusModalData {
  isVisible: boolean;
  title: string;
  msg: string;
  isSuccess: boolean;
  toggleVisible: (value: boolean) => void;
  updateTitle: (value: string) => void;
  updateMsg: (value: string) => void;
  toggleSuccess: (value: boolean) => void;
}

const initialState: statusModalData = {
  isVisible: false,
  title: "",
  msg: "",
  isSuccess: false,
  toggleVisible: () => {},
  updateTitle: () => {},
  updateMsg: () => {},
  toggleSuccess: () => {},
};

export const StatusModalContext = createContext(initialState);

const StatusModalContextProvider = (props: parentComponent) => {
  const { children } = props;

  const [isVisible, setIsVisible] = useState(initialState.isVisible);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  return (
    <StatusModalContext.Provider
      value={{
        isVisible,
        title,
        msg,
        isSuccess,
        toggleVisible: setIsVisible,
        updateTitle: setTitle,
        updateMsg: setMsg,
        toggleSuccess: setSuccess,
      }}
    >
      {children}
    </StatusModalContext.Provider>
  );
};

export default StatusModalContextProvider;
