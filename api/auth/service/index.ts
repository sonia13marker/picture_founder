import { db_models } from "../../../db";
import { successLoginData, userData } from "../../../dto/userDataDto";
import * as cry from "crypto"
import { env } from "../../../env";
import { sign } from "jsonwebtoken"
import {InvalidUserDataError, UserNotFoundError, UserIsExistError} from "../../../exceptions/AuthExceptions";
import * as fs from "fs/promises"



export async function LoginUser(userEmail: string, userPassword: string): Promise<successLoginData> {
    const hasUser = await db_models.UserModel.exists({ userEmail: userEmail })

    if (!hasUser) {
        throw new UserNotFoundError();
    }

    const userDb: userData | null = await db_models.UserModel.findOne({ userEmail: userEmail });
    const passHash = cry.createHash("sha256").update(userPassword).digest("hex");

    // if (passHash !== userDb!.userPassword) {
    //     throw new INVALID_LOGIN_USER_DATA_ERROR();
    // }

    const token = sign({ id: userDb!._id, email: userDb!.userEmail }, env.TOKEN_SECRET, { expiresIn: "1d" });
    return {
        userId: userDb!._id,
        userEmail: <string>userDb!.userEmail,
        token: token
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

    console.log(`create new user ${dbUser.userEmail}`);
    return
}
