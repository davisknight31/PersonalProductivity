export interface Task {
  id?: number;
  userId: number;
  completed: boolean;
  name: string;
  dateAdded: Date;
  priority: string;
  backLogged: boolean;
  description: string;
}
