import goose from "mongoose";
declare function ConnectDB(db_ip: String): Promise<void>;
declare const db_models: {
    UserModel: goose.Model<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        UserImages: goose.Types.ObjectId[];
        UserStat: {
            type?: {
                name?: string | null | undefined;
                count?: number | null | undefined;
                description?: string | null | undefined;
            } | null | undefined;
            require?: unknown;
        }[];
        UserName?: string | null | undefined;
        UserEmail?: string | null | undefined;
        UserPassword?: string | null | undefined;
    }, {}, {}, {}, goose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        UserImages: goose.Types.ObjectId[];
        UserStat: {
            type?: {
                name?: string | null | undefined;
                count?: number | null | undefined;
                description?: string | null | undefined;
            } | null | undefined;
            require?: unknown;
        }[];
        UserName?: string | null | undefined;
        UserEmail?: string | null | undefined;
        UserPassword?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        UserImages: goose.Types.ObjectId[];
        UserStat: {
            type?: {
                name?: string | null | undefined;
                count?: number | null | undefined;
                description?: string | null | undefined;
            } | null | undefined;
            require?: unknown;
        }[];
        UserName?: string | null | undefined;
        UserEmail?: string | null | undefined;
        UserPassword?: string | null | undefined;
    } & {
        _id: goose.Types.ObjectId;
    }, goose.Schema<any, goose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
        timestamps: true;
    }, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        UserImages: goose.Types.ObjectId[];
        UserStat: {
            type?: {
                name?: string | null | undefined;
                count?: number | null | undefined;
                description?: string | null | undefined;
            } | null | undefined;
            require?: unknown;
        }[];
        UserName?: string | null | undefined;
        UserEmail?: string | null | undefined;
        UserPassword?: string | null | undefined;
    }, goose.Document<unknown, {}, goose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        UserImages: goose.Types.ObjectId[];
        UserStat: {
            type?: {
                name?: string | null | undefined;
                count?: number | null | undefined;
                description?: string | null | undefined;
            } | null | undefined;
            require?: unknown;
        }[];
        UserName?: string | null | undefined;
        UserEmail?: string | null | undefined;
        UserPassword?: string | null | undefined;
    }>> & goose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        UserImages: goose.Types.ObjectId[];
        UserStat: {
            type?: {
                name?: string | null | undefined;
                count?: number | null | undefined;
                description?: string | null | undefined;
            } | null | undefined;
            require?: unknown;
        }[];
        UserName?: string | null | undefined;
        UserEmail?: string | null | undefined;
        UserPassword?: string | null | undefined;
    }> & {
        _id: goose.Types.ObjectId;
    }>>;
    ImageModel: goose.Model<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        imageTags: string[];
        imageOrgName?: string | null | undefined;
        imageSetName?: string | null | undefined;
        imageSize?: number | null | undefined;
        imageHash?: string | null | undefined;
        isFavotite?: boolean | null | undefined;
        extend?: string | null | undefined;
        ownerId?: goose.Types.ObjectId | null | undefined;
    }, {}, {}, {}, goose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        imageTags: string[];
        imageOrgName?: string | null | undefined;
        imageSetName?: string | null | undefined;
        imageSize?: number | null | undefined;
        imageHash?: string | null | undefined;
        isFavotite?: boolean | null | undefined;
        extend?: string | null | undefined;
        ownerId?: goose.Types.ObjectId | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        imageTags: string[];
        imageOrgName?: string | null | undefined;
        imageSetName?: string | null | undefined;
        imageSize?: number | null | undefined;
        imageHash?: string | null | undefined;
        isFavotite?: boolean | null | undefined;
        extend?: string | null | undefined;
        ownerId?: goose.Types.ObjectId | null | undefined;
    } & {
        _id: goose.Types.ObjectId;
    }, goose.Schema<any, goose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
        timestamps: true;
    }, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        imageTags: string[];
        imageOrgName?: string | null | undefined;
        imageSetName?: string | null | undefined;
        imageSize?: number | null | undefined;
        imageHash?: string | null | undefined;
        isFavotite?: boolean | null | undefined;
        extend?: string | null | undefined;
        ownerId?: goose.Types.ObjectId | null | undefined;
    }, goose.Document<unknown, {}, goose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        imageTags: string[];
        imageOrgName?: string | null | undefined;
        imageSetName?: string | null | undefined;
        imageSize?: number | null | undefined;
        imageHash?: string | null | undefined;
        isFavotite?: boolean | null | undefined;
        extend?: string | null | undefined;
        ownerId?: goose.Types.ObjectId | null | undefined;
    }>> & goose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        imageTags: string[];
        imageOrgName?: string | null | undefined;
        imageSetName?: string | null | undefined;
        imageSize?: number | null | undefined;
        imageHash?: string | null | undefined;
        isFavotite?: boolean | null | undefined;
        extend?: string | null | undefined;
        ownerId?: goose.Types.ObjectId | null | undefined;
    }> & {
        _id: goose.Types.ObjectId;
    }>>;
};
export { ConnectDB, db_models };
