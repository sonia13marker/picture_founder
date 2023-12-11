import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";


export default async function authUser( req: Request, resp: Response, next: NextFunction): Promise<void> {
    
    const authData = req.headers

    console.log(`some try connect \n ${authData.authorization}`)

    if ( !authData.authorization ){
        resp.json({message:"non autorizate. Empty token"})
        return
    }
    
    verify(authData.authorization.split(' ')[1], env.TOKEN_SECRET, (err, decode)=>{
        if ( err ) {
            resp.json({message:"non autorizate. None valide token"})
            return
        }
		console.log("user is autentificate")
        next()
    })
    return
}
