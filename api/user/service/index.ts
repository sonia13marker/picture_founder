import { Types } from "mongoose";
import { db_models } from "../../../db";
import { userData, userImageData } from "../../../dto/UserDataDto";
import { rm } from "fs/promises"
import { pathResolve } from "../../../dto/PathResolve";
import * as cry from "crypto";
import { SameUserPasswordExceptions, UnexceptionUserError, UpdateDataError, UserErrorType } from "../../../exceptions/UserExceptions"
import { userDataExt } from "../../../db/dto/UserDto";
import { CustomError } from "../../../exceptions/ExampleError";
import { FileNotFoundException } from "../../../exceptions/ServerExceptions";
import { MyError, MyLogController, MyLogService } from "../../../utils/CustomLog";

//простое получение пользователя
export async function getUserData(userId: string): Promise<userDataExt> {
    const userData = await db_models.UserModel.findById(userId)

    MyLogController(`get data for user ${userData?.userEmail}`)
    return {
        userId: userData!._id.toString(),
        userEmail: userData!.userEmail,
        imageCount: userData!.userImages.length,
        tagsCount: 0, //пока так 
        userStat: userData!.userStat,
        lastLogin: userData!.lastLogin
    }
}

//удаление пользователя
export async function DeleteUser(userId: string): Promise<void> {
    
    const user = await db_models.UserModel.findById(userId);
    const userImages =  user?.userImages as unknown as userImageData;

    await db_models.UserModel.findByIdAndDelete(user?._id);
    await db_models.ImageModel.findByIdAndDelete(userImages);

    MyLogController(`delete user ${user?.userEmail}`)
    rm(pathResolve.UserImageSaveDir(userId.toString()), {recursive: true, force: true})
    .catch( (err: Error) => {
        MyError(err.message);
        throw new FileNotFoundException(`error on remove forlder to user ${userId}`, );
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

    MyLogService(`user ${userDb?.userEmail} update password`)
    userDb?.updateOne({$set: { userPassword: newPassHash}}).exec()
    .catch( (err: CustomError) => {
        throw new UpdateDataError(err.message)
    })
}