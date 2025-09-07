import { Component, Input } from '@angular/core';
import { DepartmentFormComponent } from './features/department/department-form/department-form.component';
import { DepartmentListComponent } from './features/department/department-list/department-list.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { CommonModule } from '@angular/common';

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
  currentView: 'department' | 'user' = 'department';
  @Input() isFormOpen = false;

  switchView(type: 'department' | 'user') {
    this.currentView = type;
    this.isFormOpen = false;
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
  }
}
