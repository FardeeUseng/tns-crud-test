import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../../shared/services/department.service';
import { IDepartment } from '../../../shared/model/department';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule],
  templateUrl: './department-list.component.html',
})
export class DepartmentListComponent {
  @Output() editDepartment = new EventEmitter<IDepartment>();
  @Output() refreshDataDepartment = new EventEmitter<void>();
  @Input() departments: IDepartment[] = [];

  constructor(private departmentSevice: DepartmentService) {}

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
        this.refreshDataDepartment.emit()
      },
      error: () => {
        Swal.fire('Error!', 'Failed to delete department.', 'error');
      },
    });
  }
}
