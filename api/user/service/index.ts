import { Types } from "mongoose";
import { db_models } from "../../../db";
import { userData, userImageData } from "../../../dto/userDataDto";
import { rm } from "fs/promises"
import { pathResolve } from "../../../dto/PathResolve";
import * as cry from "crypto";
import { SameUserPasswordExceptions, UnexceptionUserError } from "../../../exceptions/UserExceptions"

//простое получение пользователя
export async function getUserData(userId: string): Promise<userData> {
    const userData: userData = await db_models.UserModel.findById(userId) as userData

    return userData
}

//удаление пользователя
export async function DeleteUser(userId: string): Promise<void> {
    
    const user = await db_models.UserModel.findById(userId);
    const userImages =  user?.userImages as userImageData[];

    await db_models.UserModel.findByIdAndDelete(user?._id);
    await db_models.ImageModel.findByIdAndDelete(...userImages);

    rm(pathResolve.UserSaveDir(userId.toString()), {recursive: true, force: true})
    .catch( (err) => {
        console.log(err);
        throw new Error(`error on remove forlder to user ${userId}`);
    })

}

//сделаю когда у пользователей булет больше данных 0_0
// export async function UpdateUser(userId:string, userData) {
    
// }

//смена праоля пользователя
export async function UpdateUserPassword(userId:string, newUserPassword: string): Promise<void> {
    
    const oldPassword = (await db_models.UserModel.findById(userId).exec())?.userPassword;
    const newPassHash = cry.createHash("sha256").update(newUserPassword).digest("hex");

    if ( oldPassword === newPassHash ) {
        throw new SameUserPasswordExceptions();
    }
}