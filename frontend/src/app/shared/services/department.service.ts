import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDepartment } from '../model/department';
import { departments } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  getDepartments(): Observable<IDepartment[]> {
    return of(departments);
  }
}
