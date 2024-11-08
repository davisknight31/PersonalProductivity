import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../shared/interfaces/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() isAdding: boolean = false;
  @Output() submitTaskCreation = new EventEmitter<void>();
  @Output() cancelTaskCreation = new EventEmitter<void>();
  @Output() removeTaskEmitter = new EventEmitter<number>();
  @Output() newTaskNameEmitter = new EventEmitter<string>();
  @Output() newTaskDescriptionEmitter = new EventEmitter<string>();
  @Output() newTaskPriorityEmitter = new EventEmitter<string>();
  newTaskSelectedPriority: string = 'Low';
  newTaskNameInputValue: string = '';
  newTaskDescriptionInputValue: string = '';

  ngOnInit() {}

  formatDate(date: Date) {
    const createdDate = new Date(date);
    return createdDate.toLocaleDateString('en-US', {
      weekday: 'short',
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  handleTaskNameChange(event: any): void {
    this.newTaskNameEmitter.emit(event);
  }

  handleTaskDescription(event: any): void {
    this.newTaskDescriptionEmitter.emit(event);
  }

  handleSelectedPriorityChange(event: any): void {
    this.newTaskPriorityEmitter.emit(event);
  }

  confirmTaskAddition() {
    this.submitTaskCreation.emit();
    this.newTaskNameInputValue = '';
    this.newTaskDescriptionInputValue = '';
    this.newTaskSelectedPriority = 'Low';
  }

  cancelTaskAddition() {
    this.isAdding = false;
    this.cancelTaskCreation.emit();
    this.newTaskNameInputValue = '';
    this.newTaskDescriptionInputValue = '';
    this.newTaskSelectedPriority = 'Low';
  }

  removeTask(taskId: number) {
    this.removeTaskEmitter.emit(taskId);
  }
}
