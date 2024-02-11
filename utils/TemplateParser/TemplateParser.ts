import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join, normalize, resolve } from "path";

export type textData = {
    subject: string,
    data: string
}

export class TempleParser{

    private readonly templatePath = resolve(__dirname, "../MessageTemplate")
    private templeFile;

    constructor( tempFile: string){
        const temp = join(this.templatePath, tempFile)

        console.log(temp);
        
        if ( !existsSync(temp)){
            throw new Error("file not found")
        }
        this.templeFile = temp;
    }

    /**
     * parseText
literal: string, exp: string     */
    public async parseText(literal: string, exp: string): Promise<textData> {
        const file = await readFile(this.templeFile, {encoding: "utf-8"})
        const subject = file.toString().split("\n")[0];
        return {
            subject: subject,
            data:  file.toString().replace(`{{${literal}}}`, exp)
        }
    }

    /**
     * parse
     */
    public async parse() {
        const file = await readFile(this.templeFile, {encoding: "utf-8"})
        const subject = file.toString().split("\n")[0];
        return {
            subject: subject,
            data:  file.toString()
        }
    }
}