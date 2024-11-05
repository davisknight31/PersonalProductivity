import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  todoSelected: boolean = true;
  notesSelected: boolean = false;
  constructor(private router: Router) {}

  updateSelection(element: HTMLDivElement): void {
    this.todoSelected = false;
    this.notesSelected = false;
    if (element.id === 'todo') {
      this.todoSelected = true;
    }
    if (element.id === 'notes') {
      this.notesSelected = true;
    }
  }
}
