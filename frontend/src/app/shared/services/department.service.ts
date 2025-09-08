import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDepartment } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:5173/api';

  constructor(private http: HttpClient) {}

  getAllDepartment(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.apiUrl}/departments`);
  }

  getOneDepartment(id: number): Observable<IDepartment> {
    return this.http.get<IDepartment>(`${this.apiUrl}/departments/${id}`)
  }

  createDepartment(data: { name: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/departments`, data)
  }

  editDepartment(id: number, payload: IDepartment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/departments/${id}`, payload)
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/departments/${id}`)
  }
}
