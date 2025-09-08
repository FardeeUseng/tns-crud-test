import { Component } from '@angular/core';
import { DepartmentFormComponent } from './features/department/department-form/department-form.component';
import { DepartmentListComponent } from './features/department/department-list/department-list.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { IDepartment } from './shared/model/department';

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

  switchView(type: 'department' | 'user') {
    this.currentView = type;
    this.isFormOpen = false;
  }

  handleOpenForm() {
    this.isFormOpen = true;
  }

  handleCloseForm() {
    this.editDepartment = null;
    this.isFormOpen = false;
  }

  handleEditDepartment(department: IDepartment) {
    this.editDepartment = department;
    this.isFormOpen = true;
  }
}
