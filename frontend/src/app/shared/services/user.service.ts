import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5173/api';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`);
  }

  getOneUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${id}`)
  }

  createUser(payload: Omit<IUser, "id">): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users`, payload)
  }

  editUser(id: number, payload: Omit<IUser, "id">): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${id}`, payload)
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`)
  }
}
