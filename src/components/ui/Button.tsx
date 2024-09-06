import { ButtonProps } from "../../types/uiTypes"

export default function Button({ type, text, onClick, className, icon }: ButtonProps): React.JSX.Element {
  return (
    <button className={className} type={type} onClick={onClick}>
      {icon}
      {text}
    </button>
  )
}
