import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { IUser } from '../models/entities/IUser';
import { ISearchUsersResponse } from '../models/requests/ISearchUsersResponse';
import { IRepo } from '../models/entities/IRepo';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl: string;
  private baseHeaders = {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  };

  private clientId: string;
  private clientSecret: string;
  private authCallbackUrl: string;
  private state: string;
  private oauthToken: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = "https://api.github.com";

    this.clientId = "";
    this.clientSecret = "";
    this.authCallbackUrl = "http://localhost:4200";
    this.state = "";

    /*     this.getOauthToken()
          .pipe(first())
          .subscribe(token => this.oauthToken = token); */
  }

  public getUser(userName: string): Observable<IUser> {
    // const userUrl = `${this.baseUrl}/users/${userName}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    const userUrl = `${this.baseUrl}/users/${userName}`;

    return this.http.get<IUser>(userUrl);
  }

  public searchUsers(userName: string): Observable<IUser[]> {
    // const usersUrl = `${this.baseUrl}/search/users?q=${userName}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    const usersUrl = `${this.baseUrl}/search/users?q=${userName}`;

    if (!userName)
      return of([]);
      
    return this.http.get<ISearchUsersResponse>(usersUrl)
      .pipe(
        switchMap(response => of(response.items))
      );
  }

  public getRepos(reposUrl: string): Observable<IRepo[]> {
    return this.http.get<IRepo[]>(`${reposUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);
  }

  private getOauthToken(): Observable<string> {
    const commonParams = `client_id=${this.clientId}&state=${this.state}&redirect_uri=${this.authCallbackUrl}`;

    let codeUrl = `${this.baseUrl}/login/oauth/authorize?${commonParams}`;
    let tokenUrl = `${this.baseUrl}/login/oauth/access_token?${commonParams}&client_secret=${this.clientSecret}`;

    return this.http.get<string>(codeUrl, { headers: this.baseHeaders })
      .pipe(
        switchMap(code => {
          return this.http.get<string>(tokenUrl + `&code=${code}`, { headers: this.baseHeaders });
        })
      );
  }
}
