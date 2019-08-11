import { IUser } from '../entities/IUser';

export interface ISearchUsersResponse {
    total_count: number;
    incomplete_results: boolean;
    items: IUser[];
}