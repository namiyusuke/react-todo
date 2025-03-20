import "./App.css";
import { useState } from "react";
import InputTodos from "./components/InputTodos";
import IncompleteTodos from "./components/IncompleteTodos";
import CompleteTodos from "./components/CompleteTodos";
import { Todo, Priority } from "./types/todo";

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");

  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([
    { id: "1", text: "todoです1", priority: "medium" },
    { id: "2", text: "todoです2", priority: "low" },
  ]);

  const [completeTodos, setCompleteTodos] = useState<Todo[]>([
    { id: "3", text: "完了でした1", priority: "high" },
    { id: "4", text: "完了でした2", priority: "medium" },
  ]);

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: todoText,
      priority: priority,
    };
    setIncompleteTodos([...incompleteTodos, newTodo]);
    setTodoText("");
  };

  const onClickDelete = (index: number) => {
    console.log(index);
    const newTodos = [...incompleteTodos];
    console.log(newTodos);
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index: number) => {
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    const newIncompleteTodos = [...incompleteTodos];
    setCompleteTodos(newCompleteTodos);
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
  };

  const onClickBack = (index: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="w-1/2 mx-auto">
        <InputTodos
          todoText={todoText}
          priority={priority}
          onChange={onChangeTodoText}
          onChangePriority={(p) => setPriority(p)}
          onClick={onClickAdd}
        />
        <IncompleteTodos
          incompleteTodos={incompleteTodos}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDelete}
        />
        <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
      </div>
    </>
  );
}

export default App;
