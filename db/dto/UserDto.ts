import { userData, userStatData } from "../../dto/UserDataDto";


export interface DBUserData extends userData{
    userPassword: string
}

export interface userDataExt  {
    userId: string,
    userEmail: string,
    imageCount: number,
    tagsCount: number,
    userStat: Array<userStatData>
}

export interface userDataDB extends userData, Document {
    userPassword: string;
    _id: any;
}
