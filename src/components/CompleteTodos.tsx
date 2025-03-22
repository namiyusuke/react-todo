import { Todo, Priority } from "../type/todo";

function CompleteTodos(props: { completeTodos: Todo[]; onClickBack: (index: number) => void }) {
  const { completeTodos, onClickBack } = props;

  /**
   * 優先度に応じた背景色のクラス名を返す
   * @param priority タスクの優先度
   * @returns TailwindCSSのクラス名
   */
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 border-l-4 border-red-500 opacity-60";
      case "medium":
        return "bg-yellow-50 border-l-4 border-yellow-500 opacity-60";
      case "low":
        return "bg-green-50 border-l-4 border-green-500 opacity-60";
      default:
        return "bg-gray-50 opacity-60";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">完了したTODO</h2>

      {completeTodos.length === 0 ? (
        <p className="text-gray-500 text-center py-4">完了したタスクはありません</p>
      ) : (
        <ul className="space-y-3">
          {completeTodos.map((todo, index) => (
            <li key={todo.id} className={`${getPriorityColor(todo.priority)} rounded-lg shadow-sm`}>
              <div className="p-4">
                {/* タスクのテキスト */}
                <h3 className="text-lg font-medium text-gray-800 mb-2 line-through">{todo.text}</h3>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {/* 優先度の表示 */}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      todo.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : todo.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    } opacity-60`}
                  >
                    {todo.priority === "high" ? "高" : todo.priority === "medium" ? "中" : "低"}
                  </span>

                  {/* 期限日の表示 */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 opacity-60">
                    期限: {todo.dueDate}
                  </span>
                </div>

                {/* アクションボタン */}
                <button
                  onClick={() => onClickBack(index)}
                  className="px-3 py-1 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  戻す
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompleteTodos;
