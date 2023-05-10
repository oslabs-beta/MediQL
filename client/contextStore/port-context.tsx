import React, { createContext, useState } from "react";

//typescript
interface PortContextProps {
  port: string;
  setPort: React.Dispatch<React.SetStateAction<string>>;
}

//typescript
const PortContext = createContext<PortContextProps>({
  port: "",
  setPort: () => {},
});

export const PortContextProvider = (props) => {
  const [port, setPort] = useState("");
  const portContextValue = { port, setPort };

  return (
    <PortContext.Provider value={portContextValue}>
      {props.children}
    </PortContext.Provider>
  );
};

export default PortContext;
