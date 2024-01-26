

export class CustomError extends Error {
    public code: Number;
    public detail: string
    public statusCode: number
    constructor(message: string, code: Number, detail?: string, statusCode?:  number) {
        super(message || "no message");
        this.code =  code || 0;
        this.detail = detail || "Not detail";
        this.statusCode = statusCode || 0;
    }
}