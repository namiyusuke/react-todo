import { Todo, Priority, RepeatType } from "../type/todo";

function IncompleteTodos(props: {
  incompleteTodos: Todo[];
  onClickComplete: (index: number) => void;
  onClickDelete: (index: number) => void;
}) {
  const { incompleteTodos, onClickComplete, onClickDelete } = props;

  /**
   * 優先度に応じた背景色のクラス名を返す
   * @param priority タスクの優先度
   * @returns TailwindCSSのクラス名
   */
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 border-l-4 border-red-500"; // 高優先度: 赤色
      case "medium":
        return "bg-yellow-50 border-l-4 border-yellow-500"; // 中優先度: 黄色
      case "low":
        return "bg-green-50 border-l-4 border-green-500"; // 低優先度: 緑色
      default:
        return "bg-gray-50"; // デフォルト: グレー
    }
  };

  /**
   * 繰り返しタイプに応じた表示テキストを返す
   * @param repeatType 繰り返しの種類
   * @returns 表示用テキスト
   */
  const getRepeatText = (repeatType: RepeatType) => {
    switch (repeatType) {
      case "daily":
        return "毎日";
      case "weekly":
        return "毎週";
      case "monthly":
        return "毎月";
      default:
        return "";
    }
  };

  /**
   * 期限切れかどうかを判定
   * @param dueDate 期限日
   * @returns 期限切れならtrue、そうでなければfalse
   */
  const isOverdue = (dueDate: string) => {
    // 現在の日付（時刻なし）と比較
    return new Date(dueDate) < new Date(new Date().toDateString());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">未完了のTODO</h2>

      {incompleteTodos.length === 0 ? (
        <p className="text-gray-500 text-center py-4">未完了のタスクはありません</p>
      ) : (
        <ul className="space-y-3">
          {/* タスクリストのマッピング */}
          {incompleteTodos.map((todo, index) => (
            <li key={todo.id} className={`${getPriorityColor(todo.priority)} rounded-lg shadow-sm`}>
              <div className="p-4">
                {/* タスクのテキスト */}
                <h3 className="text-lg font-medium text-gray-800 mb-2">{todo.text}</h3>

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
                    }`}
                  >
                    {todo.priority === "high" ? "高" : todo.priority === "medium" ? "中" : "低"}
                  </span>

                  {/* 期限日の表示（期限切れは赤字） */}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${isOverdue(todo.dueDate) ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    期限: {todo.dueDate}
                  </span>

                  {/* 繰り返し設定の表示（設定されている場合のみ） */}
                  {todo.repeatType !== "none" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {getRepeatText(todo.repeatType)}
                    </span>
                  )}
                </div>

                {/* アクションボタン */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onClickComplete(index)}
                    className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    完了
                  </button>
                  <button
                    onClick={() => onClickDelete(index)}
                    className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncompleteTodos;
