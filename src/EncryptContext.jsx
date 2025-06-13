import React, { createContext, useState } from "react";

export const EncryptionContext = createContext();

export const EncryptionProvider = ({ children }) => {
  const [encryptionData, setEncryptionData] = useState(null);

  return (
    <EncryptionContext.Provider value={{ encryptionData, setEncryptionData }}>
      {children}
    </EncryptionContext.Provider>
  );
};
