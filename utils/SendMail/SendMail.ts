import { Transporter, createTransport } from "nodemailer"
import { env } from "../../envEmail";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { MyLogService } from "../CustomLog";

class Mailer {

    private transporter;

    constructor(){
        this.transporter = this.GetTransporter()
    }

    private GetTransporter(): Transporter  {
        
        const transConfig: SMTPTransport.Options = {
            host: env.EMAIL_HOST,
            port: env.EMAIL_PORT,
            secure: false,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        }

        return createTransport(transConfig)
    }

    public SendEmail( userEmail: string, subject: string, content: string){
        this.transporter.sendMail({
            from: env.FROM_SEND_EMAIL,
            to: userEmail,
            subject: subject,
            text: "Приветствуем! Команда Pic2re",
            html: content            
        })
        .then(data => {
           MyLogService(`send mail to ${data.accepted.toString()}`)
        })
        .catch( err => {
            console.log(err);
        })
    }
}

const mailer = new Mailer()
export default mailer