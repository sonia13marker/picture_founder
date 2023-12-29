import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";


export default async function authUser( req: Request, resp: Response, next: NextFunction): Promise<void> {
    
    const authData = req.headers.authorization 
    const authHeader = req.headers;

    console.log(`[HEADERS LOG]csome try connect \n ${JSON.stringify(authHeader)}\n`)
    console.log(`[HEADERS LOG]${JSON.stringify(authData)}\n\n${JSON.stringify(req.body)}\n`)
    
    if ( !authData ){
        resp.json({message:"non autorizate. Empty token", detail: `${JSON.stringify(authHeader)}${JSON.stringify(req.body)}`}).status(401)
        return
    }
    
    verify(authData.split(" ")[1], env.TOKEN_SECRET, (err: any)=>{
        if ( err ) {
            resp.json({message:"non autorizate. None valide token", detail: `${JSON.stringify(authData)}\n\n${JSON.stringify(req.body)}`}).status(403)
            return
        }
		console.log("user is autentificate")
        next()
    })
    return
}
