import { MyError } from "../utils/CustomLog";
import { CustomError } from "./ExampleError";

export enum FileSystemErrorTypes {
    NOT_DETECTED_ERROR = 300,
    FILE_NOT_FOUND_IN_FS,
    UNEXCEPTED_SAVE_IMAGE_ERROR,
}

export enum ServerErrorTypes{
    DATABASE_ERROR = 310
}

export class FileNotFoundException extends CustomError{
    constructor(detailInfo?: string){
        super(
            "FILE_NOT_FOUND_IN_FS",
            FileSystemErrorTypes.FILE_NOT_FOUND_IN_FS,
            detailInfo || "not found required file",
            404
        );
        this.name = "USER_NOT_FOUND "
        MyError("not found required file")
    }
}

export class ImageError extends CustomError{
    constructor(detailInfo?: string){
        super(
            "UNEXCEPTED_SAVE_IMAGE_ERROR",
            FileSystemErrorTypes.UNEXCEPTED_SAVE_IMAGE_ERROR,
            detailInfo || "not found required image",
            500
        );
        this.name = "UNEXCEPTED_SAVE_IMAGE_ERROR "
        MyError("not found required image")
    }
}

export class DataBaseError extends CustomError{
    constructor(detailInfo?: string){
        super(
            "DATABASE_ERROR",
            ServerErrorTypes.DATABASE_ERROR,
            detailInfo || "error when send request to data base",
            500
        );
        this.name = "DATABASE_ERROR "
        MyError("error when send request to data base")
    }
}