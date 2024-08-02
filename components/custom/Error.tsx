import React from "react";
interface ErrorProps {
    message: string;
  }
const Error: React.FC<ErrorProps>  = ({ message }) => {
  return (
    <li>
      <span className="text-sm text-red-400">{message}</span>
    </li>
  );
};

export default Error;
