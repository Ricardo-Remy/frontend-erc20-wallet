import {
  ReactChildren,
  ReactChild,
  MouseEventHandler,
  FunctionComponent,
} from "react";

interface ButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  dataTestid: string;
  className?: string;
  children?: ReactChild | ReactChildren;
  onClick?: MouseEventHandler;
}

const Button: FunctionComponent<ButtonProps> = ({
  type = "button",
  dataTestid,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className="btn btn-primary submit-button focus:ring focus:outline-none w-80"
      data-testid={dataTestid}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
