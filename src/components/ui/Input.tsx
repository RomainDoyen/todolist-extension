type InputProps = {
  type: string
  title: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

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
