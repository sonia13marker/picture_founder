import { MyError } from "../utils/CustomLog";
import { CustomError } from "./ExampleError";


export enum AuthErrorType {
    NOT_IMPLEMENT_ERROR = 100,
    USER_NOT_FOUND,
    USER_IS_EXIST,
    USER_DATA_INVALID
}

export class AuthCustomError extends CustomError {
    constructor(message: string, code: AuthErrorType = 100, detail: string = "error when Auth", statusCode: number = 500) {
        super(message, code, detail, statusCode);
    }
}

export class UserNotFoundError extends AuthCustomError {
    constructor(detailInfo?: string) {
        super(
            "USER_NOT_FOUND",
            AuthErrorType.USER_NOT_FOUND,
            detailInfo || "not found user in data base",
            404
        );
        this.name = "USER_NOT_DOUND_ERROR "
        MyError("not found user in data base")
    }
}

export class InvalidUserDataError extends AuthCustomError {
    constructor(detailInfo?: string) {
        super(
            "USER_DATA_INVALID",
            AuthErrorType.USER_DATA_INVALID,
            detailInfo || "access user data invalide",
            404
        );
        this.name = "INVALID_LOGIN_USER_DATA_ERROR"
        MyError("access user data invalide")
    }
}

export class UserIsExistError extends AuthCustomError {
    constructor(detailInfo?: string) {
        super(
            "USER_IS_EXIST",
            AuthErrorType.USER_IS_EXIST,
            detailInfo || "user already exist in database",
            409
        );
        this.name = "INVALID_LOGIN_USER_DATA_ERROR"

        MyError("user already exist in database")
    }
}