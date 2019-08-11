import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/entities/IUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public selectedUser: string;

  constructor() { }

  ngOnInit() {
  }

  public selectUser(user: IUser): void {
    if (user.login)
      this.selectedUser = user.login;
  }
}
