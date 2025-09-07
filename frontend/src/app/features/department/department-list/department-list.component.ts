import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDepartment } from '../../../shared/model/department';
import { DepartmentService } from '../../../shared/services/department.service';

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
