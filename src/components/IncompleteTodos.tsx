import { Todo } from "../types/todo";

function IncompleteTodos(props: {
  incompleteTodos: Todo[];
  onClickComplete: (index: number) => void;
  onClickDelete: (index: number) => void;
}) {
  const { incompleteTodos, onClickComplete, onClickDelete } = props;
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100";
      case "medium":
        return "bg-yellow-100";
      case "low":
        return "bg-green-100";
    }
  };

  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {incompleteTodos.map((todo, index) => (
          <li key={todo.id}>
            <div className={`list-row ${getPriorityColor(todo.priority)} p-2 rounded`}>
              <p className="todo-item">{todo.text}</p>
              <span className="text-sm mx-2">
                {todo.priority === "high" ? "高" : todo.priority === "medium" ? "中" : "低"}
              </span>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncompleteTodos;
