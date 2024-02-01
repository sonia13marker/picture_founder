import { Types } from "mongoose";
import { db_models } from "../../../db";
import { userData, userImageData } from "../../../dto/UserDataDto";
import { rm } from "fs/promises"
import { pathResolve } from "../../../dto/PathResolve";
import * as cry from "crypto";
import { SameUserPasswordExceptions, UnexceptionUserError } from "../../../exceptions/UserExceptions"
import { userDataExt } from "../../../db/dto/UserDto";
import { CustomError } from "../../../exceptions/ExampleError";

//простое получение пользователя
export async function getUserData(userId: string): Promise<userDataExt> {
    const userData = await db_models.UserModel.findById(userId)

    return {
        userId: userData!._id.toString(),
        userEmail: userData!.userEmail,
        userImages: userData!.userImages,
        userStat: userData!.userStat
    }
}

//удаление пользователя
export async function DeleteUser(userId: string): Promise<void> {
    
    const user = await db_models.UserModel.findById(userId);
    const userImages =  user?.userImages as unknown as userImageData;

    await db_models.UserModel.findByIdAndDelete(user?._id);
    await db_models.ImageModel.findByIdAndDelete(userImages);

    rm(pathResolve.UserImageSaveDir(userId.toString()), {recursive: true, force: true})
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
    
    const userDb = await db_models.UserModel.findById(userId);
    const newPassHash = cry.createHash("sha256").update(newUserPassword).digest("hex");
    
    if ( userDb?.userPassword === newPassHash ) {
        throw new SameUserPasswordExceptions();
    }

    userDb?.updateOne({$set: { userPassword: newPassHash}}).exec()
    .catch( (err: CustomError) => {
        throw new Error(err.message)
    })
}