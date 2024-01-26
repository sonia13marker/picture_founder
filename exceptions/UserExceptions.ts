import { CustomError } from "./ExampleError";


//start from 200
export enum UserErrorType{
    PASSWORD_IS_SAME = 200,
    UNDEFIND_ERROR = 201
}

export class SameUserPasswordExceptions extends CustomError{ 
    constructor(detail?: string){
        super(
            "SET_SAME_PASSWORD",
            200,
            "error on try user set same password",
            409
        )
    }
}
export class UnexceptionUserError extends CustomError {
    constructor(detail?: string){
        super(
            "UNDEFIND_ERROR",
            201,
            "undefind error on precces request",
            500
        )
    }
}