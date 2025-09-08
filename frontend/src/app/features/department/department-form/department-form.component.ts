import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentService } from '../../../shared/services/department.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IDepartment } from '../../../shared/model/department';

@Component({
  selector: 'app-department-form',
  imports: [ModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent implements OnInit, OnChanges {
  @Input() isFormOpen = false;
  @Input() editDepartment: IDepartment | null = null;
  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  deptForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.deptForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.deptForm) return;

    if (changes['editDepartment']) {
      if (this.editDepartment) {
        this.deptForm.patchValue({
          name: this.editDepartment.name,
        });
      } else {
        this.deptForm.reset();
      }
    }
  }

  handleCloseForm() {
    this.deptForm.reset();
    this.closeForm.emit();
  }

  async onSubmit() {
    if (!this.deptForm.valid) return;

    if (this.editDepartment?.id) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this department?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
      });

      if (!result.isConfirmed) return;

      this.departmentService
        .editDepartment(this.editDepartment.id, this.deptForm.value)
        .subscribe({
          next: () => {
            Swal.fire(
              'Updated!',
              'Department updated successfully.',
              'success'
            );
            this.refreshData.emit();
            this.handleCloseForm();
          },
          error: () => {
            Swal.fire('Error!', 'Failed to update department.', 'error');
          },
        });
    } else {
      this.departmentService.createDepartment(this.deptForm.value).subscribe({
        next: () => {
          Swal.fire('Created!', 'Department added successfully.', 'success');
          this.refreshData.emit();
          this.handleCloseForm();
        },
        error: () => {
          Swal.fire('Error!', 'Failed to add department.', 'error');
        },
      });
    }
  }
}
