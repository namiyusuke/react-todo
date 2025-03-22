import { Priority, RepeatType } from "../type/todo";

function InputTodos(props: {
  todoText: string;
  priority: Priority;
  dueDate: string;
  repeat: RepeatType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePriority: (priority: Priority) => void;
  onChangeDueDate: (date: string) => void;
  onChangeRepeat: (repeat: RepeatType) => void;
  onClick: () => void;
}) {
  const { todoText, priority, dueDate, repeat, onChange, onChangePriority, onChangeDueDate, onChangeRepeat, onClick } =
    props;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">新しいタスクを追加</h2>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-end">
        {/* タスク名入力 */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">タスク名</label>
          <input
            type="text"
            placeholder="タスクを入力してください"
            value={todoText}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 優先度選択 */}
        <div className="w-full md:w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">優先度</label>
          <select
            value={priority}
            onChange={(e) => onChangePriority(e.target.value as Priority)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        {/* 期限日選択 */}
        <div className="w-full md:w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">期限日</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => onChangeDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 繰り返し設定 */}
        <div className="w-full md:w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">繰り返し</label>
          <select
            value={repeat}
            onChange={(e) => onChangeRepeat(e.target.value as RepeatType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">繰り返しなし</option>
            <option value="daily">毎日</option>
            <option value="weekly">毎週</option>
            <option value="monthly">毎月</option>
          </select>
        </div>

        {/* 追加ボタン */}
        <button
          onClick={onClick}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          追加
        </button>
      </div>
    </div>
  );
}

export default InputTodos;
