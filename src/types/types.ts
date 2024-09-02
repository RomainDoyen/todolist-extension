export type Todo = {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CardNotesProps = {
  todos: Todo[];
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export type CardInputProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};