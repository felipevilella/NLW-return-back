import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6048ffd3254fd2",
        pass: "a860b6eb23e4f4"
    }
});

export class NodemailMAilAdapter implements MailAdapter {
    async sendMail({body, subject}: MailAdapterData){


    await transport.sendMail({
        from: 'Equipe feedget <oi@fe\\\\edget.com>',
        to: 'Felipe Vilella <felipevilellaalves@hotmail.com>',
        subject,
        html: body
    })
    }

}