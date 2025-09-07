import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser, users } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): Observable<IUser[]> {
    return of(users);
  }
}
