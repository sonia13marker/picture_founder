import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";


export default async function authUser( req: Request, resp: Response, next: NextFunction): Promise<void> {
    
    const authData = req.headers
    console.log(authData);

    if ( !authData.authorization ){
        resp.json({message:"non autorizate"})
        return
    }
    
    verify(authData.authorization.split(' ')[1], env.TOKEN_SECRET, (err, decode)=>{
        if ( err ) {
            resp.json({message:"non autorizate"})
            return
        }

        next()
    })
}