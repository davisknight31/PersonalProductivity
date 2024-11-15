import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NoteService } from '../../core/services/note.service';
import { Note } from '../../shared/interfaces/note';
import { UserService } from '../../core/services/user.service';
import { NotesListComponent } from './notes-list/notes-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterModule, NotesListComponent, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  notes: Note[] = [];
  creating: boolean = false;

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserNotes();
  }

  getUserNotes() {
    this.notes = [];
    console.log(this.userService.user!.id);
    this.noteService.getNotes(this.userService.user!.id).subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => console.error(error),
    });
  }

  navigateNotesEditor(noteId: number) {
    this.router.navigate(['/edit-notes', noteId]);
  }

  createNote() {
    console.log('s');
    this.creating = true;
  }

  submitCreation(newNoteName: string) {
    this.creating = false;
    // console.log(this.userService.user!.id);
    const newNote: Note = {
      userId: this.userService.user!.id,
      name: newNoteName,
      dateAdded: new Date(),
      content: '',
    };

    this.noteService.createNote(newNote).subscribe({
      next: (note) => {
        this.refreshNotes();
        console.log(note);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cancelCreation(value: boolean) {
    this.creating = value;
  }

  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe({
      next: () => {
        this.refreshNotes();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  refreshNotes() {
    this.getUserNotes();
  }
}
