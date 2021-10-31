export interface IBillingModel {
    id?: string;
    receiverId: string;
    payerId: string;
    invoiceNo: string;
    billAmount: number;
    status: string;
    date?: Date;
}