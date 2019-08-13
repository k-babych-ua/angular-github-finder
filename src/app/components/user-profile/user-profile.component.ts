import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/entities/IUser';
import { GithubService } from 'src/app/services/github.service';
import { Observable } from 'rxjs';
import { IRepo } from 'src/app/models/entities/IRepo';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: IUser;
  public repos: IRepo[];

  @Input() userLogin: Observable<string>;

  constructor(
    private githubService: GithubService
  ) {

  }

  ngOnInit() {
    this.userLogin.subscribe(login => {
      this.githubService.getUser(login)
        .subscribe(user => {
          console.log(user);

          this.user = user;

          this.githubService.getRepos(user.repos_url)
            .subscribe(repos => this.repos = repos);
        });
    });
  }

}
