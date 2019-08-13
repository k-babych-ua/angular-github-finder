import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/entities/IUser';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public selectedUser: Observable<string>;

  constructor() { }

  ngOnInit() {
  }

  public selectUser(user: IUser): void {
    console.log('user emitted');
    console.log(JSON.stringify(user));

    if (user.login)
      this.selectedUser = of(user.login);
  }
}
