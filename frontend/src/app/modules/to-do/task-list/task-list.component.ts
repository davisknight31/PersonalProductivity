import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../shared/interfaces/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
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
  @Output() flippedStatusTasksEmitter = new EventEmitter<Task[]>();
  @Output() moveTaskToOppositeListEmitter = new EventEmitter<Task>();
  @Output() submitEditTaskEmitter = new EventEmitter<Task>();

  isEditing: boolean = false;
  taskToEdit: Task | undefined;
  editedName: string = '';
  editedDescription: string = '';
  editedPriority: string = '';
  flippedStatusTasks: Task[] = [];
  newTaskSelectedPriority: string = 'Low';
  newTaskNameInputValue: string = '';
  newTaskDescriptionInputValue: string = '';
  sortedBy: string = '';
  taskToShowFullDescription: Task | undefined;
  fullDescriptionTasks: Task[] = [];

  ngOnInit() {
    this.sortByDateAdded();
    // this.fullDescriptionTasks = this.tasks;
  }

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

  handleNewTaskNameChange(event: any): void {
    this.newTaskNameEmitter.emit(event);
  }

  handleNewTaskDescription(event: any): void {
    this.newTaskDescriptionEmitter.emit(event);
  }

  handleNewSelectedPriorityChange(event: any): void {
    this.newTaskPriorityEmitter.emit(event);
  }

  handleFlip(alteredTask: Task) {
    if (this.flippedStatusTasks.includes(alteredTask)) {
      this.flippedStatusTasks = this.flippedStatusTasks.filter(
        (task) => task.id !== alteredTask.id
      );
    } else {
      this.flippedStatusTasks.push(alteredTask);
    }
    // this.checkedOffTasks.length > 0
    //   ? this.tasksAreCheckedOff.emit(true)
    //   : this.tasksAreCheckedOff.emit(false);

    this.flippedStatusTasksEmitter.emit(this.flippedStatusTasks);
  }

  handleListSwap(task: Task) {
    this.moveTaskToOppositeListEmitter.emit(task);
  }

  handleEditClick(task: Task) {
    this.cancelEdit();
    this.taskToEdit = task;
    this.editedName = task.name;
    this.editedDescription = task.description;
    this.editedPriority = task.priority;
    this.isEditing = true;
  }

  handleSubmitEditClick(task: Task) {
    task.name = this.editedName;
    task.description = this.editedDescription;
    task.priority = this.editedPriority;
    this.submitEditTaskEmitter.emit(task);
  }

  cancelEdit() {
    this.taskToEdit = undefined;
    this.editedName = '';
    this.editedDescription = '';
    this.editedPriority = '';
    this.isEditing = false;
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

  handleSortMethodChange(event: any) {
    console.log(event);
    if (event === 'HighToLow') {
      this.sortHighToLow();
    } else if (event === 'LowToHigh') {
      this.sortLowToHigh();
    } else {
      this.sortByDateAdded();
    }
  }

  sortByDateAdded() {
    const sortedTasks = this.tasks.sort((a, b) => {
      return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
    });

    this.tasks = sortedTasks;
  }

  sortHighToLow() {
    const priorityOrder: { [key: string]: number } = {
      High: 3,
      Moderate: 2,
      Low: 1,
    };

    const sortedTasks = this.tasks.sort((a, b) => {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    this.tasks = sortedTasks;
  }

  sortLowToHigh() {
    const priorityOrder: { [key: string]: number } = {
      High: 1,
      Moderate: 2,
      Low: 3,
    };

    const sortedTasks = this.tasks.sort((a, b) => {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    this.tasks = sortedTasks;
  }

  handleFullDescriptionClick(task: Task) {
    const foundTask = this.fullDescriptionTasks.find((t) => t.id === task.id);

    foundTask
      ? (this.fullDescriptionTasks = this.fullDescriptionTasks.filter(
          (t) => t.id !== task.id
        ))
      : this.fullDescriptionTasks.push(task);
  }

  isShowingFullDescription(task: Task): boolean {
    const descriptionIsExpanded = this.fullDescriptionTasks.find(
      (fullDescriptionTask) => fullDescriptionTask === task
    )
      ? true
      : false;
    return descriptionIsExpanded;
  }
}
