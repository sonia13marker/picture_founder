import { db_models } from "../../../db";
import { successLoginData, userData } from "../../../dto/UserDataDto";
import * as cry from "crypto"
import { env } from "../../../env";
import { sign } from "jsonwebtoken"
import {InvalidUserDataError, UserNotFoundError, UserIsExistError} from "../../../exceptions/AuthExceptions";
import * as fs from "fs/promises"
import { userDataDB } from "../../../db/dto/UserDto";
import { MyLogService } from "../../../utils/CustomLog";
import Mailer from "../../../utils/SendMail/SendMail";
import { TempleParser } from "../../../utils/TemplateParser/TemplateParser";



export async function LoginUser(userEmail: string, userPassword: string): Promise<successLoginData> {
    const hasUser = await db_models.UserModel.exists({ userEmail: userEmail })

    if (!hasUser) {
        throw new UserNotFoundError();
    }

    const userDb: userDataDB | null = await db_models.UserModel.findOne({ userEmail: userEmail });
    const passHash = cry.createHash("sha256").update(userPassword).digest("hex");

    if (passHash !== userDb!.userPassword) {
        throw new InvalidUserDataError();
    }

    const token = sign({ id: userDb!._id, email: userDb!.userEmail }, env.TOKEN_SECRET, { expiresIn: "1d" });
    MyLogService("user login")
    
    await db_models.UserModel.findByIdAndUpdate(userDb?._id, {lastLogin: new Date()})
    return {
        userId: userDb!._id,
        userEmail: <string>userDb!.userEmail,
        token: token,
        checkUpdate: userDb!.checkUpdate
    };
}

export async function regisUser(userEmail: string, userPassword: string) {
    const hasUser = await db_models.UserModel.exists({ userEmail: userEmail })
    const tmpFiles = "uploads";

    if (hasUser) {
        throw new UserIsExistError();
    }

    const hash = cry.createHash('sha256');
    userPassword = hash.update(userPassword).digest("hex");

    let dbUser = await db_models.UserModel.create({ userEmail, userPassword })
    await fs.mkdir(`${tmpFiles}/save/${dbUser._id}`, { recursive: true })

    const parse = await new TempleParser("Register.html").parseText("userName", dbUser.userEmail)
    Mailer.SendEmail(dbUser.userEmail, parse.subject, parse.data)

    MyLogService(`create new user ${dbUser.userEmail}`);
    return
}

export async function ForgotPass(userEmail: string) {
    

    const user =  (await db_models.UserModel.find({userEmail}))[0]

    if ( !user ){
        throw new UserNotFoundError()
    }

    const newPass = makeid(12)
    user.userPassword = cry.createHash("sha256").update(newPass).digest("hex");
    user.save()
    .then( data => {
        MyLogService("user forgot password | password is updated")
        return new TempleParser("ForgotPass.html").parseText(`newPass`, newPass)
    })
    .then( parse => {
        Mailer.SendEmail(userEmail, parse.subject, parse.data)
    })
    .catch( err => {
        throw new Error(err.message)
    })
}

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_^&*()-%$#@!';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}