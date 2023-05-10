import React, { useContext } from "react";
import PortContext from "../../contextStore/port-context";

function LogoBar() {
  const { setPort: setGlobalPort } = useContext(PortContext);

  const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalPort(event.target.value);
  };

  return (
    <>
      <div className="logo-bar">
        <h2> MediQL </h2>
        <input
          type="text"
          placeholder="PORT#"
          onChange={handlePortChange}
        ></input>
      </div>
    </>
  );
}

export default LogoBar;
