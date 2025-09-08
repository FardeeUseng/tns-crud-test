import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../../shared/services/department.service';
import { IDepartment } from '../../../shared/model/department';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule],
  templateUrl: './department-list.component.html',
})
export class DepartmentListComponent implements OnInit {
  @Output() editDepartment = new EventEmitter<IDepartment>();
  departments: IDepartment[] = [];

  constructor(private departmentSevice: DepartmentService) {}

  ngOnInit(): void {
    this.loadDataDepartments();
  }

  loadDataDepartments() {
    this.departmentSevice.getAllDepartment().subscribe({
      next: (response) => {
        this.departments = response;
      },
    });
  }

  onEditDepartment(department: IDepartment) {
    this.editDepartment.emit(department);
  }

  async onDeleteDepartment(id: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Delete this department?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
    });

    if (!result.isConfirmed) return;

    this.departmentSevice.deleteDepartment(id).subscribe({
      next: () => {
        Swal.fire('Updated!', 'Department deleted successfully.', 'success');
        this.loadDataDepartments();
      },
      error: () => {
        Swal.fire('Error!', 'Failed to delete department.', 'error');
      },
    });
  }
}
