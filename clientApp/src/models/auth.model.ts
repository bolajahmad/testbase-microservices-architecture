export interface LoginModel {
    username: string;
    password: string;
}

export interface UserRegisterModel {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface AuthenticatedUser {
    token: string;
    username: string;
    id: string;
    lastName: string;
    firstName: string;
}

