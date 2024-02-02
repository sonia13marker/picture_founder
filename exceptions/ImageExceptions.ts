import { MyError } from "../utils/CustomLog";
import { CustomError } from "./ExampleError";


export enum ImageErrorCode {
    NOT_FOUND_USER = 400,
    EMPTY_USER_DATA,
    IMAGE_IS_EXIST,
    UPDATE_ERROR
}

export class NoUserDataError extends CustomError {
    constructor(detail?: string) {
        super(
            "EMPTY_USER_DATA",
            ImageErrorCode.EMPTY_USER_DATA,
            "user data is empty",
            404
        )
        MyError("user data is empty")
    }
}

export class UserImageExistError extends CustomError {
    constructor(detail?: string) {
        super(
            "IMAGE_IS_EXIST",
            ImageErrorCode.IMAGE_IS_EXIST,
            "image in user data is exist",
            409
        )
        MyError("image in user data is exist")
    }
}

export class UserUpdateError extends CustomError {
    constructor(detail?: string) {
        super(
            "UPDATE_ERROR",
            ImageErrorCode.UPDATE_ERROR,
            "error when update image data",
            400
        )
        MyError("image in user data is exist")
    }
}