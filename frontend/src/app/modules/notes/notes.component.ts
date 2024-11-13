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

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.login('jdoe812', 'password').subscribe({
      next: (loggedInUser) => {
        this.getUserNotes();
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }

  getUserNotes() {
    this.noteService.getNotes(this.userService.user.id).subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => console.error(error),
    });
  }

  navigateNotesEditor(noteId: number) {
    this.router.navigate(['/edit-notes', noteId]);
  }
}
