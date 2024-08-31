import React, { useState } from "react";
import { createContext, useContext } from "react";

export const SomeContext = createContext();

const HookUseContext = ({ children }) => {
  const [newGet, setNewGet] = useState(false);
  const [addDev, setaddDev] = useState(false);
  const [editDev, setEditDev] = useState(false);
  const [deleteDev, setDeleteDev] = useState(false);
  const [showNotification, setShowNotification] = useState(false)

  return (
    <div style={{ height: "100%" }}>
      <SomeContext.Provider
        value={{
          newGet,
          setNewGet,
          addDev,
          setaddDev,
          editDev,
          setEditDev,
          deleteDev,
          setDeleteDev,
          showNotification, 
          setShowNotification
        }}
      >
        {children}
      </SomeContext.Provider>
    </div>
  );
};
export default HookUseContext;
