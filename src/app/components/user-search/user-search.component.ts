import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { Subject, Observable } from 'rxjs';
import { IUser } from 'src/app/models/entities/IUser';
import { debounceTime, distinctUntilChanged, switchMap, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  @Output() selectUserEvent = new EventEmitter<IUser>();

  public users: Observable<IUser[]>;
  public searchTerm: string = "";

  private searchTerms = new Subject<string>();
  
  constructor(
    private githubService: GithubService 
  ) { }

  ngOnInit() {
    console.log("init");

    this.users = this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => this.githubService.searchUsers(term))
    );

    this.users.subscribe(user => console.log(user));
  }

  public searchUsers(term: string): void {
    console.log(term);

    if (term)
      this.searchTerms.next(term);
  }

  public selectUser(user: IUser): void {
    console.log(`select user ${user.login}`);

    if (user) {
      this.searchTerm = "";
      this.searchTerms.next("");

      this.selectUserEvent.emit(user);
    }
  }
}
