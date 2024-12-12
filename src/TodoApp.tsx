import { useOptimistic, useRef, useState } from "react";

import { Todo } from "./@types/Todo";

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoList
      todos={todos}
      createTodo={async (todoTitle) => {
        const todo = await new Promise<Todo>((resolve) => {
          setTimeout(() => {
            const todo: Todo = {
              title: todoTitle,
              status: "TODO",
            };
            resolve(todo);
          }, 1000);
        });
        setTodos((todos) => [...todos, todo]);
        return todo;
      }}
    />
  );
};

const TodoList = ({
  todos,
  createTodo,
}: {
  todos: Todo[];
  createTodo: (todoTitle: string) => Promise<Todo>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    (Todo & { isPending?: boolean })[],
    string
  >(todos, (todos, todoTitle) => {
    return [
      ...todos,
      {
        title: todoTitle,
        status: "TODO",
        isPending: true,
      } as Todo,
    ];
  });

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {optimisticTodos.map((todo, index) => (
          <li key={index}>
            {todo.title}
            {todo.isPending ? <>(creating)</> : null}
          </li>
        ))}
      </ul>
      <form
        ref={formRef}
        action={async (formData) => {
          const todoTitle = (formData.get("title") as string) ?? "";
          formRef.current?.reset();
          addOptimisticTodo(todoTitle);
          await createTodo(todoTitle);
        }}
      >
        <input name="title" />
        <button type="submit">submit</button>
      </form>
    </>
  );
};
