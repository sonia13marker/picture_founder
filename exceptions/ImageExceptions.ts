import { CustomError } from "./ExampleError";


export enum ImageErrorCode {
    NOT_FOUND_USER = 400,
    EMPTY_USER_DATA,
    IMAGE_IS_EXIST
}

export class NoUserDataError extends CustomError {
    constructor(detail?: string) {
        super(
            "EMPTY_USER_DATA",
            ImageErrorCode.EMPTY_USER_DATA,
            "user data is empty",
            404
        )
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
    }
}