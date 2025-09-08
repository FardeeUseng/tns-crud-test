import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../shared/model/user';
import { UserService } from '../../../shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Output() editUser = new EventEmitter<IUser>();
  @Output() refreshDataUser = new EventEmitter<void>();
  @Input() users: IUser[] = [];

  constructor(private userSevice: UserService) {}

  onEditUser(user: IUser) {
    this.editUser.emit(user);
  }

  async onDeleteUser(id: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
    });

    if (!result.isConfirmed) return;

    this.userSevice.deleteUser(id).subscribe({
      next: () => {
        Swal.fire('Updated!', 'User deleted successfully.', 'success');
        this.refreshDataUser.emit()
      },
      error: () => {
        Swal.fire('Error!', 'Failed to delete User.', 'error');
      },
    });
  }
}
