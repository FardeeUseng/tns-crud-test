import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../shared/model/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private api: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.api.getAllUser().subscribe({
      next: (response) => {
        this.users = response;
        console.log("users", response)
      },
      error: (error) => {
        console.error("error", error);
      }
    })
  }
}
