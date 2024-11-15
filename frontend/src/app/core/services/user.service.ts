import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5032/api';
  // user: User = {
  //   id: 0,
  //   userName: 'default',
  //   firstName: 'default',
  //   lastName: 'default',
  // };
  user: User | undefined;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const loginBody = {
      username: username,
      password: password,
    };

    return this.http.post<User>(`${this.apiUrl}/users/login`, loginBody).pipe(
      tap((loggedInUser) => {
        this.user = loggedInUser;
      })
    );
  }
}
