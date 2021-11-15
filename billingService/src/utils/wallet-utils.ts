import { BillingSchema, IWalletModel } from "../models";
import MessageBroker from "../rabbit";

export class WalletUtils {
    public static async creditSelf(model: IWalletModel) {
        console.log({ model })
        const { userId, username, billAmount } = model;

        const billing = new BillingSchema({
            receiverId: userId,
            payerId: userId,
            invoiceNo: 1,
            billAmount,
            status: "Processing",
            date: new Date()
        });
        billing.save();

        const broker = await MessageBroker.getInstance();
        await broker.send('credit-self', Buffer.from(JSON.stringify({
            userId,
            username,
            amount: billAmount
        })));
    }

    public static async transferFund(model: IWalletModel) {
        
    }
}