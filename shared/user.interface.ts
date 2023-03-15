export interface IUser{
    id?: string;
    username?: string;
    email?: string;
    createdAt?: number;
    lastUpdatedAt?: number;
}

export interface ICreateUserDto{
    username?: string;
    email?: string;
}