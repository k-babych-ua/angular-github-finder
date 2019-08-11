import { IUser } from './IUser';

export interface IRepo {
    id: number;
    name: string;
    private: boolean;
    description: string;
    owner: IUser;

    url: string;
    html_url: string;
}