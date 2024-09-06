import { InputProps } from "../../types/uiTypes"

export default function Input({ type, title, onChange, placeholder, className }: InputProps): React.JSX.Element {
  return (
    <input
      type={type}
      value={title}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required
    />
  )
}
