import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  todoSelected: boolean = true;
  notesSelected: boolean = false;
  user: User | undefined;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

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
