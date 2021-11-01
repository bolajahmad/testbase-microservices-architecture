import { handleEmailValidation } from ".";
import { sendConfirmationEmail } from "../config";
import { EmailSchema, IEmailConfig } from "../models";

export class EmailUtils {
    public static async send(mail: IEmailConfig) {
        const { email, html, subject } = mail;

        // validate email structure
        handleEmailValidation(mail);
        
        // get db instance
        const emailDetails = new EmailSchema({ email, subject, html });

        // send email
        sendConfirmationEmail({ html, subject, email });

        // save to db
        emailDetails.save((error, data) => {
            if (error) console.log({ error });
            console.log({ data })
        })
    }
}