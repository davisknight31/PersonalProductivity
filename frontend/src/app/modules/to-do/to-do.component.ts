import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Task } from '../../shared/interfaces/task';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/interfaces/user';
import { TaskService } from '../../core/services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [TaskListComponent, ButtonComponent, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
})
export class ToDoComponent {
  allTasks: Task[] = [];
  dailyTasks: Task[] = [];
  backLoggedTasks: Task[] = [];
  loggedInUser!: User;
  isAddingDailyTask: boolean = false;
  isAddingBacklogTask: boolean = false;
  areButtonsDisabled: boolean = false;
  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskPriority: string = 'Low';

  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    //move this to login page once created
    this.userService.login('jdoe812', 'password').subscribe({
      next: (loggedInUser) => {
        this.loggedInUser = loggedInUser;
        this.getUserTasks();
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
    // this.tasks = this.addTask();
  }

  getUserTasks() {
    this.allTasks = [];
    this.dailyTasks = [];
    this.backLoggedTasks = [];
    this.taskService.getTasks(this.loggedInUser.id).subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.categorizeTasks();
      },
      error: (error) => {
        console.error('Failed to retrieve tasks', error);
      },
    });
  }

  categorizeTasks() {
    this.allTasks.forEach((task) => {
      console.log(this.allTasks);
      task.backLogged
        ? this.backLoggedTasks.push(task)
        : this.dailyTasks.push(task);
    });
  }

  setNewTaskName(value: string) {
    this.newTaskName = value;
  }

  setNewTaskDescription(value: string) {
    this.newTaskDescription = value;
  }

  setNewTaskPriority(value: string) {
    this.newTaskPriority = value;
  }

  addDailyTask() {
    this.isAddingDailyTask = true;
    this.areButtonsDisabled = true;
  }

  addBacklogTask() {
    this.isAddingBacklogTask = true;
    this.areButtonsDisabled = true;
  }

  createTask(forBacklog: boolean) {
    this.isAddingDailyTask = false;
    this.areButtonsDisabled = false;
    this.isAddingBacklogTask = false;
    this.areButtonsDisabled = false;

    const newTask: Task = {
      userId: this.userService.user.id,
      name: this.newTaskName,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      dateAdded: new Date(),
      completed: false,
      backLogged: forBacklog,
    };

    console.log(newTask);

    //call api
    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.getUserTasks();
      },
      error: (error) => {
        console.error('Task creation failed:', error);
      },
    });

    this.newTaskPriority = 'Low';
  }

  cancelTask() {
    this.isAddingDailyTask = false;
    this.areButtonsDisabled = false;
    this.isAddingBacklogTask = false;
    this.areButtonsDisabled = false;
  }

  deleteTask(value: number) {
    this.taskService.deleteTask(value).subscribe({
      next: () => {
        this.getUserTasks();
      },
      error: (error) => {
        console.error('Task deletion failed', error);
      },
    });
  }
}
