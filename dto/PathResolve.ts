import { normalize, resolve, join } from "path"


class PathResolve{
    // private readonly  workDir: string ="iuh";
    // public readonly imageUploadDir: string = join( this.workDir, "uploads", "tmp");
    // public readonly userSaveDir: string = join( this.workDir, "uploads", "save");

    public ImageUploadDir(userId: string){
        return join( this.Workdir(), "uploads", "tmp");
    }

    public Workdir(): string {
        return normalize(__dirname + "/..");
    }

    /**
     * userSaveDir
     */
    public UserSaveDir(userId: string): string {
        return join( this.Workdir(), "uploads", "save", userId);
    }
    
}

const pathResolve = new PathResolve()
export {pathResolve}