"use client";
const { createContext, useState, useContext } = require("react");

const ContactContext = createContext();

const Context = ({ children }) => {
  const [update, setUpdate] = useState({});
  return (
    <ContactContext.Provider value={{ update, setUpdate }}>
      {children}
    </ContactContext.Provider>
  );
};

export default Context;

export const ContextValue = () => {
  const { update, setUpdate } = useContext(ContactContext);
  return { update, setUpdate };
};
