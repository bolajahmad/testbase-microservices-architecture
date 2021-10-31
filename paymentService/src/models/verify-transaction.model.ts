import { AuthenticatedUser } from "./authenticated-user";

export interface VerifyPaymentModel {
    reference: string;
    email: string;
    amount: number;
    accountNumber?: string; 
    bankCode?: string;
    user: AuthenticatedUser;
}