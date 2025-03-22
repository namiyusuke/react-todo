export type Priority = "high" | "medium" | "low";
export type RepeatType = "none" | "daily" | "weekly" | "monthly";

export interface Todo {
  id: string;
  text: string;
  priority: Priority;
  dueDate: string;
  repeatType: RepeatType;
}
