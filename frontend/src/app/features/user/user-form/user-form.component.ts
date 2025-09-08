import { CommonModule } from '@angular/common';
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
import Swal from 'sweetalert2';
import { IUser } from '../../../shared/model/user';
import { UserService } from '../../../shared/services/user.service';
import { IDepartment } from '../../../shared/model/department';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() isFormOpen = false;
  @Input() editUser: IUser | null = null;
  @Input() departments: IDepartment[] = [];
  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.userForm) return;

    if (changes['editUser']) {
      if (this.editUser) {
        this.userForm.patchValue({
          name: this.editUser.name,
          departmentId: this.editUser.departmentId
        });
      } else {
        this.userForm.reset();
      }
    }
  }

  handleCloseForm() {
    this.userForm.reset();
    this.closeForm.emit();
  }

  async onSubmit() {
    if (!this.userForm.valid) return;

    if (this.editUser?.id) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
      });

      if (!result.isConfirmed) return;

      this.userService
        .editUser(this.editUser.id, this.userForm.value)
        .subscribe({
          next: () => {
            Swal.fire('Updated!', 'User updated successfully.', 'success');
            this.refreshData.emit();
            this.handleCloseForm();
          },
          error: () => {
            Swal.fire('Error!', 'Failed to update department.', 'error');
          },
        });
    } else {
      this.userService.createUser(this.userForm.value).subscribe({
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
