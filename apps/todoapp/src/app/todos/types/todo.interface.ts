export interface TodoInterface {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface TodoResponse {
  todos: TodoInterface[];
}
