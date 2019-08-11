export interface IUser {
    id: number;
    name: string;
    login: string;
    email: string;
    location: string;
    bio: string;
    publicReposAmount: number;

    url: string;
    html_url: string;
    avatarUrl: string;
    repos_url: string;
 }