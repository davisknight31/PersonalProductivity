import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ToDoComponent } from './modules/to-do/to-do.component';
import { NotesComponent } from './modules/notes/notes.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todo', component: ToDoComponent },
  { path: 'notes', component: NotesComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
];
