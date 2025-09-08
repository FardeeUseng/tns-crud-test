import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5173/api';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getOneUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`)
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data)
  }

  editUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`)
  }
}
