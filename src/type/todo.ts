export type Priority = "high" | "medium" | "low";

export interface Todo {
  id: string;
  text: string;
  priority: Priority;
}
