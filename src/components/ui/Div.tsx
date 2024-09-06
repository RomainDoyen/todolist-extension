import { DivProps } from "../../types/uiTypes"

export default function Div({ key, setSelectedTodo, title, description, className }: DivProps): JSX.Element {
  return (
    <div key={key} className={className}  onClick={setSelectedTodo}>
      {title}
      {description}
    </div>
  )
}
