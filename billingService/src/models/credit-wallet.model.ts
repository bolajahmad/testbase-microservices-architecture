import { AuthenticatedUser } from "./auth-user";

export interface CreditWalletModel {
    userId: string;
    firstName?: string;
    lastName?: string;
    amount: number;
    payer: AuthenticatedUser;
}

export interface IWalletModel {
    userId: string;
    username: string;
    billAmount: number;
    status: string;
}