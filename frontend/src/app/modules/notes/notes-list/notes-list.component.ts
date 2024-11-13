import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../../shared/interfaces/note';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {
  @Input() notes: Note[] = [];
  @Output() selectedNoteIdEmitter = new EventEmitter<number>();

  handleEditNotesNavigation(noteId: number) {
    this.selectedNoteIdEmitter.emit(noteId);
  }
}
