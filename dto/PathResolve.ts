import { normalize, resolve, join } from "path"


class PathResolve{
    // UserSaveDir(userId: string): string {
    //     throw new Error("Method not implemented.");
    // }

    public Workdir(): string {
        return normalize(__dirname + "/..");
    }

    public UserImageUploadDir(){
        return join( this.Workdir(), "uploads", "tmp");
    }

    /**
     * userSaveDir
     */
    public UserImageSaveDir(userId: string): string {
        return join( this.Workdir(), "uploads", "save", userId);
    }
    
}

const pathResolve = new PathResolve()
export {pathResolve}