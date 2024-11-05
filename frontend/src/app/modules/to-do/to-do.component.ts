import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Task } from '../../shared/interfaces/task';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [TaskListComponent, ButtonComponent],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
})
export class ToDoComponent {
  tasks: Task[] = [];

  ngOnInit() {
    this.tasks = [
      {
        completed: false,
        name: 'Bug Ticket #4',
        dateAdded: new Date(),
        priority: 'Low',
        backLogged: false,
      },
      {
        completed: true,
        name: 'Emails',
        dateAdded: new Date(),
        priority: 'Moderate',
        backLogged: false,
      },
      {
        completed: false,
        name: 'Code Review',
        dateAdded: new Date(),
        priority: 'High',
        backLogged: true,
      },
      {
        completed: true,
        name: 'Feature Ticket #6',
        dateAdded: new Date(),
        priority: 'High',
        backLogged: false,
      },
      {
        completed: false,
        name: 'Feature Ticket #8',
        dateAdded: new Date(),
        priority: 'Low',
        backLogged: true,
      },
      {
        completed: true,
        name: 'Retro Meeting',
        dateAdded: new Date(),
        priority: 'High',
        backLogged: false,
      },
    ];
    console.log(this.tasks);
    this.addTask();
  }

  addTask() {
    // if (!this.tasks) {
    //   // Ensure tasks is defined
    //   this.tasks = [];
    // }

    // Define the new task
    const newTask: Task = {
      completed: false,
      name: 'New Task',
      dateAdded: new Date(),
      priority: 'Low',
      backLogged: true,
    };

    // Add the new task to the tasks array
    this.tasks.push(newTask);
    console.log('Task added:', this.tasks); // Confirm task is added
  }
}

// tasks: Task[] = []; // Initialize here to prevent undefined issues

// ngOnInit() {
//   this.tasks = [
//     {
//       completed: false,
//       name: 'Bug Ticket #4',
//       dateAdded: new Date(),
//       priority: 'Low',
//       backLogged: false,
//     },
//     {
//       completed: true,
//       name: 'Emails',
//       dateAdded: new Date(),
//       priority: 'Moderate',
//       backLogged: false,
//     },
//     {
//       completed: false,
//       name: 'Code Review',
//       dateAdded: new Date(),
//       priority: 'High',
//       backLogged: true,
//     },
//     {
//       completed: true,
//       name: 'Feature Ticket #6',
//       dateAdded: new Date(),
//       priority: 'High',
//       backLogged: false,
//     },
//     {
//       completed: false,
//       name: 'Feature Ticket #8',
//       dateAdded: new Date(),
//       priority: 'Low',
//       backLogged: true,
//     },
//     {
//       completed: true,
//       name: 'Retro Meeting',
//       dateAdded: new Date(),
//       priority: 'High',
//       backLogged: false,
//     },
//   ];
// }

// addTask() {
//   if (!this.tasks) {
//     // Ensure tasks is defined
//     this.tasks = [];
//   }

//   // Define the new task
//   const newTask: Task = {
//     completed: false,
//     name: 'New Task',
//     dateAdded: new Date(),
//     priority: 'Low',
//     backLogged: true,
//   };

//   // Add the new task to the tasks array
//   this.tasks.push(newTask);
//   console.log('Task added:', this.tasks); // Confirm task is added
// }
