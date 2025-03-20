import { Priority } from "../types/todo";
function InputTodos(props: {
  todoText: string;
  priority: Priority;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePriority: (priority: Priority) => void;
  onClick: () => void;
}) {
  const { todoText, priority, onChange, onChangePriority, onClick } = props;
  return (
    <>
      <div className="input-area">
        <input type="text" placeholder="TODO入力する" value={todoText} onChange={onChange} />
        <select value={priority} onChange={(e) => onChangePriority(e.target.value as Priority)} className="mx-2">
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <button onClick={onClick}>追加</button>
      </div>
    </>
  );
}

export default InputTodos;
