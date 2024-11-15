import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  enteredUsername: string = '';
  enteredPassword: string = '';

  constructor(private userService: UserService, private route: Router) {}

  login() {
    console.log(this.enteredUsername, this.enteredPassword);
    this.userService
      .login(this.enteredUsername, this.enteredPassword)
      .subscribe({
        next: () => {
          this.route.navigate(['/todo']);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
