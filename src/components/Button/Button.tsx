import { FC, ReactElement } from "react"
import "./style.css"

interface ButtonProps {
  children: ReactElement;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <>
      <button className="button-custom" onClick={onClick}>
        {children}
      </button>
    </>
  )
}