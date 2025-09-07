import { Component, OnInit } from '@angular/core';
import { IDepartment } from '../../../core/mock-data';
import { DepartmentService } from '../../../core/services/department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule],
  templateUrl: './department-list.component.html',
})
export class DepartmentListComponent implements OnInit {
  departments: IDepartment[] = [];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    })
  }
}
