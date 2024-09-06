type TextareaProps = {
  value: string;
  className: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ value, className, placeholder, onChange }: TextareaProps): React.JSX.Element {
  return (
    <textarea
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
