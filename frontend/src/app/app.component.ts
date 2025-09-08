import { Component } from '@angular/core';
import { DepartmentFormComponent } from './features/department/department-form/department-form.component';
import { DepartmentListComponent } from './features/department/department-list/department-list.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { IDepartment } from './shared/model/department';
import { IUser } from './shared/model/user';
import { DepartmentService } from './shared/services/department.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    DepartmentFormComponent,
    DepartmentListComponent,
    UserFormComponent,
    UserListComponent,
    CommonModule,
  ],
})
export class AppComponent {
  isFormOpen = false;
  currentView: 'department' | 'user' = 'department';
  editDepartment: IDepartment | null = null;
  editUser: IUser | null = null;

  departments: IDepartment[] = [];
  users: IUser[] = [];

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadDataDepartments();
    this.loadDataUsers();
  }

  loadDataDepartments() {
    this.departmentService.getAllDepartment().subscribe({
      next: (response) => {
        this.departments = response;
      },
    });
  }

  loadDataUsers() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.users = response;
      },
    });
  }

  switchView(type: 'department' | 'user') {
    this.currentView = type;
    this.isFormOpen = false;
  }

  handleOpenForm() {
    this.isFormOpen = true;
  }

  handleCloseForm() {
    this.editDepartment = null;
    this.editUser = null;
    this.isFormOpen = false;
  }

  handleEditDepartment(department: IDepartment) {
    this.editDepartment = department;
    this.isFormOpen = true;
  }

  handleEditUser(user: IUser) {
    this.editUser = user;
    this.isFormOpen = true;
  }
}
