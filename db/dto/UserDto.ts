import { userData, userStatData } from "../../dto/UserDataDto";


export interface DBUserData extends userData{
    userPassword: string,
    checkUpdate: boolean
}

export interface userDataExt  {
    userId: string,
    userEmail: string,
    imageCount: number,
    tagsCount: number,
    userStat: Array<userStatData>,
    checkUpdate: boolean
}

export interface userDataDB extends userData, Document {
    userPassword: string;
    _id: any;
    checkUpdate: boolean;
}
