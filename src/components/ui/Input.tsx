type InputProps = {
  type: string
  title: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export default function Input({ type, title, onChange, placeholder }: InputProps): React.JSX.Element {
  return (
    <input
      type={type}
      value={title}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  )
}
