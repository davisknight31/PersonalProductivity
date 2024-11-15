import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { Note } from '../../../shared/interfaces/note';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TruncatePipe],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {
  @Input() notes: Note[] = [];
  @Input() creating: boolean = false;
  @Output() selectedNoteIdEmitter = new EventEmitter<number>();
  @Output() deleteNoteEmitter = new EventEmitter<number>();
  @Output() cancelNoteCreationEmitter = new EventEmitter<boolean>();
  @Output() submitNoteCreationEmitter = new EventEmitter<string>();

  filteredNotes: Note[] = [];
  searchTerm: string = '';
  deletingNote: boolean = false;
  noteToDelete: Note | undefined;
  newNoteName: string = '';

  ngOnInit() {
    this.filteredNotes = this.notes;
  }

  ngOnChanges() {
    this.filteredNotes = this.notes;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate =
      (date.getMonth() + 1).toString() +
      '-' +
      date.getDate().toString() +
      '-' +
      date.getFullYear().toString();
    return formattedDate;
  }

  handleEditNotesNavigation(noteId: number) {
    this.selectedNoteIdEmitter.emit(noteId);
  }

  filterSearch(term: string) {
    const filter = this.notes.filter((note) =>
      note.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(filter);
    this.filteredNotes = filter.length > 0 ? filter : [];
    console.log(this.filteredNotes);
  }

  handleDeleteNoteClick(note: Note) {
    console.log('Deleting');
    this.deletingNote = true;
    this.noteToDelete = note;
  }

  confirmDeleteNoteClick() {
    this.deleteNoteEmitter.emit(this.noteToDelete?.id);
    this.noteToDelete = undefined;
    this.deletingNote = false;
  }

  cancelDeleteNoteClick() {
    this.noteToDelete = undefined;
    this.deletingNote = false;
  }

  confirmNewNoteClick() {
    this.submitNoteCreationEmitter.emit(this.newNoteName);
    this.creating = false;
    this.newNoteName = '';
  }

  cancelNewNoteClick() {
    this.cancelNoteCreationEmitter.emit(false);
    this.creating = false;
    this.newNoteName = '';
  }
}
