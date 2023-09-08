import React from "react";
import "./Button.scss";

interface ButtonProps {
  onClick?: () => void;
  className?: "secondary" | "disabled";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
