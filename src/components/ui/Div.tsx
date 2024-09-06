type DivProps = {
  key?: number;
  setSelectedTodo?: () => void;
  title?: string | JSX.Element;
  description: string | JSX.Element;
  className: string;
};

export default function Div({ key, setSelectedTodo, title, description, className }: DivProps): JSX.Element {
  return (
    <div key={key} className={className}  onClick={setSelectedTodo}>
      {title}
      {description}
    </div>
  )
}
