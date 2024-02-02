import { DefaultResponse } from "../dto/responseDto";


export function DefaultErrorResponse (code: number, message: string, detail: string): DefaultResponse{
    return {code, message, detail}
}