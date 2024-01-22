

export enum errorType {
    USER_NOT_FOUND = 100,
    USER_IS_EXIST,
    USER_DATA_INVALID
}

export class customError extends Error {
    public errCode: errorType;
    constructor(message: string, errCode: errorType) {
        super(message);
        this.errCode =  errCode;
    }
}

export class USER_NOT_FOUND_ERROR extends customError {
    constructor(code: errorType, message?: string) {
        super(
            message ||
            "not found user in data bse",
            code
        );
        this.name = "USER_NOT_DOUND_ERROR "
    }
}

export class INVALID_LOGIN_USER_DATA_ERROR extends customError {
    constructor(code: errorType, message?: string) {
        super(
            message ||
            "user login data not correct",
            code
        );
        this.name = "INVALID_LOGIN_USER_DATA_ERROR"
    }
}

export class USER_IS_EXIST_ERROR extends customError {
    constructor(code: errorType, message?: string) {
        super(
            message ||
            "user login data not correct",
            code
        );
        this.name = "INVALID_LOGIN_USER_DATA_ERROR"
    }
}