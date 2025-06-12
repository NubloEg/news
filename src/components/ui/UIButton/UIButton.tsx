import { type ButtonHTMLAttributes } from "react";
import s from "./UIButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "add" | "create";
}

export default function UIButton({ ...props }: Props) {
  function selectVariant(): string {
    switch (props.variant) {
      case "add":
        return s.add;
      case "create":
        return s.create;
      default:
        return "";
    }
  }

  return (
    <button
      {...props}
      className={`${s.button} ${props.className} ${selectVariant()}`}
    >
      {props.children}
    </button>
  );
}
