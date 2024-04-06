"use client";
import { createContext, useState, useContext } from "react";

const ContactContext = createContext();

const Context = ({ children }) => {
  const [update, setUpdate] = useState({});

  const updateContact = (updatedContact) => {
    setUpdate(updatedContact);
  };
  return (
    <ContactContext.Provider value={{ update, updateContact }}>
      {children}
    </ContactContext.Provider>
  );
};
export default Context;

export const ContextValue = () => useContext(ContactContext);
