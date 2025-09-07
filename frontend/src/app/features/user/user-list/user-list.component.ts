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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    })
  }
}
