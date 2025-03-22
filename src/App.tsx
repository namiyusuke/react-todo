import "./App.css";
import { useState, useEffect } from "react";
import InputTodos from "./components/InputTodos";
import IncompleteTodos from "./components/IncompleteTodos";
import CompleteTodos from "./components/CompleteTodos";
import { Todo, Priority, RepeatType } from "./type/todo";

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [repeat, setRepeat] = useState<RepeatType>("none");
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  //incompleteTodosとcompleteTodosをローカルストレージに保存する処理
  //ローカルストレージから読み込む処理
  const loadTodosFromLocalStorage = () => {
    try {
      const saveIncompleteTodos = localStorage.getItem("incompleteTodos");
      const saveCompleteTodos = localStorage.getItem("completeTodos");
      return {
        incompleteTodos: saveIncompleteTodos ? JSON.parse(saveIncompleteTodos) : [],
        completeTodos: saveCompleteTodos ? JSON.parse(saveCompleteTodos) : [],
      };
    } catch (error) {
      console.error("ローカルストレージからの読み込みに失敗しました", error);
    }
  };
  const saveTodoLocalStorage = (incompleteTodos: Todo[], completeTodos: Todo[]) => {
    localStorage.setItem("incompleteTodos", JSON.stringify(incompleteTodos));
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  };

  useEffect(() => {
    const savedData = loadTodosFromLocalStorage();
    setIncompleteTodos(savedData?.incompleteTodos || []);
    setCompleteTodos(savedData?.completeTodos || []);
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      saveTodoLocalStorage(incompleteTodos, completeTodos);
    }
  }, [incompleteTodos, completeTodos, isInitialLoad]);

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);
  const calculateNextDueDate = (dueDate: string, repeatType: RepeatType) => {
    if (repeatType === "none") return dueDate;
    const date = new Date(dueDate);
    if (repeatType === "daily") {
      date.setDate(date.getDate() + 1);
    }
    if (repeatType === "weekly") {
      date.setDate(date.getDate() + 7);
    }
    if (repeatType === "monthly") {
      date.setMonth(date.getMonth() + 1);
    }
    return date.toISOString().split("T")[0];
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: todoText,
      priority: priority,
      dueDate: dueDate || new Date().toISOString().split("T")[0],
      repeatType: repeat,
    };
    const newIncompleteTodos = [...incompleteTodos, newTodo];
    newIncompleteTodos.sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    setIncompleteTodos(newIncompleteTodos);
    setTodoText("");
    setDueDate("");
    setRepeat("none");
  };

  const onClickDelete = (index: number) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index: number) => {
    const targetTodo = incompleteTodos[index];
    // 完了リストに追加
    const newCompleteTodos = [...completeTodos, targetTodo];
    setCompleteTodos(newCompleteTodos);

    // 未完了リストから削除し、新しい配列を作成
    const newIncompleteTodos = incompleteTodos.filter((_, i) => i !== index);

    // 繰り返しタスクの場合、次回のタスクを作成
    if (targetTodo.repeatType !== "none") {
      const nextDueDate = calculateNextDueDate(targetTodo.dueDate, targetTodo.repeatType);
      const nextTodo: Todo = {
        ...targetTodo,
        id: Date.now().toString(),
        dueDate: nextDueDate,
      };
      newIncompleteTodos.push(nextTodo);
    }
    // 期限日でソート
    newIncompleteTodos.sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">TODOアプリ</h1>

        <InputTodos
          todoText={todoText}
          priority={priority}
          onChange={onChangeTodoText}
          onChangePriority={(p) => setPriority(p)}
          onClick={onClickAdd}
          dueDate={dueDate}
          onChangeDueDate={(date) => setDueDate(date)}
          repeat={repeat}
          onChangeRepeat={(r) => setRepeat(r)}
        />

        <IncompleteTodos
          incompleteTodos={incompleteTodos}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDelete}
        />

        <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
      </div>
    </div>
  );
}

export default App;
