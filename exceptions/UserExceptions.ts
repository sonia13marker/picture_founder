import { CustomError } from "./ExampleError";


//start from 200
export enum UserErrorType{
    UNDEFIND_ERROR = 200,
    PASSWORD_IS_SAME = 201,
    UPDATE_ERROR,
    NOT_FOUND_ANY_DATA,
    VALIDATE_ERROR,
    USER_NOT_FOUND
}

export class SameUserPasswordExceptions extends CustomError{ 
    constructor(detail?: string){
        super(
            "SET_SAME_PASSWORD",
            UserErrorType.UNDEFIND_ERROR,
            "error on try user set same password",
            409
        )
    }
}

export class UnexceptionUserError extends CustomError {
    constructor(detail?: string){
        super(
            "UNDEFIND_ERROR",
            UserErrorType.PASSWORD_IS_SAME,
            "undefind error on precces request",
            500
        )
    }
}

export class UpdateDataError extends CustomError {
    constructor(detail?: string){
        super(
            "UPDATE_DATA_ERROR",
            UserErrorType.UPDATE_ERROR,
            "error while update user data",
            500
        )
    }
}

export class NotFoundAnyDataInUser extends CustomError{ 
    constructor(detail?: string){
        super(
            "NOT_FOUND_ANY_DATA",
            UserErrorType.NOT_FOUND_ANY_DATA,
            "not found user data what requested",
            404
        )
    }
}