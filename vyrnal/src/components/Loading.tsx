import React from "react";
import "../app/globals.css";

const Loading = () => {
  return (
    <div
      className="h-screen flex justify-center items-center"
    >
      <div className="flex items-center justify-center w-[140px] h-[60px] relative">
        <div className="circle bg-primary" />
        <div className="circle bg-primary" />
        <div className="circle bg-primary" />
      </div>
    </div>
  );
};

export default Loading;
