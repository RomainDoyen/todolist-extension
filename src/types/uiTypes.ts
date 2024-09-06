export type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  text?: string;
  onClick?: () => void;
  className?: string;
  icon?: JSX.Element;
};

export type TextareaProps = {
  value: string;
  className: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type DivProps = {
  key?: number;
  setSelectedTodo?: () => void;
  title?: string | JSX.Element;
  description: string | JSX.Element;
  className: string;
};

export type InputProps = {
  type: string
  title: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
};