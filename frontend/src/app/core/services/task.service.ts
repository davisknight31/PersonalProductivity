import { Injectable } from '@angular/core';
import { Task } from '../../shared/interfaces/task';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5032/api';
  tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  getTasks(userId: number) {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/${userId}`).pipe(
      tap((tasks) => {
        this.tasks = tasks;
      })
    );
  }

  createTask(newTask: Task) {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, newTask).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  flipCompletionFlag(taskId: number) {
    return this.http
      .put<Task>(`${this.apiUrl}/tasks/flipcompletionflag`, taskId)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  flipBackloggedFlag(taskId: number) {
    return this.http
      .put<Task>(`${this.apiUrl}/tasks/flipbackloggedflag`, taskId)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  editTask(task: Task) {
    return this.http
      .put(`${this.apiUrl}/tasks`, {
        id: task.id,
        name: task.name,
        description: task.description,
        priority: task.priority,
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  deleteTask(taskId: number) {
    return this.http
      .delete(`${this.apiUrl}/tasks/${taskId}`, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error(error));
        })
      );
  }
}
