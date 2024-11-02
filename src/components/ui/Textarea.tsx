import { TextareaProps } from "../../types/uiTypes"

export default function Textarea({ value, className, placeholder, onChange, rows }: TextareaProps): React.JSX.Element {
  return (
    <textarea
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
    />
  )
}
