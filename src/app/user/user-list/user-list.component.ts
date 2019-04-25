import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnChanges {

  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;

  users: any[] = [];
  filteredUsers: any[] = [];

  constructor(private userService: UserService,
              private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnChanges(): void {
    if (this.groupFilters) this.filterUserList(this.groupFilters, this.users);
  }

  filterUserList(filters: any, users: any): void {
    this.filteredUsers = this.users;     //Reset User List

    const keys = Object.keys(filters);
    const filterUser = user => keys.every(key => user[key] === filters[key]);

    this.filteredUsers = this.users.filter(filterUser);

    this.ref.detectChanges();
  }

  loadUsers(): void {
    this.userService.fetchUsers()
                    .subscribe(users => this.users = users);

    this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;                
  }

}