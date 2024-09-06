type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  text?: string;
  onClick?: () => void;
  className?: string;
  icon?: JSX.Element;
}

export default function Button({ type, text, onClick, className, icon }: ButtonProps): React.JSX.Element {
  return (
    <button className={className} type={type} onClick={onClick}>
      {icon}
      {text}
    </button>
  )
}
