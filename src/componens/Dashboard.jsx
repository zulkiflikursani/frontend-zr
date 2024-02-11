import React from "react";
import NavigationBar from "./NavigationBar";

const dahsboard = ({ children }) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default dahsboard;
