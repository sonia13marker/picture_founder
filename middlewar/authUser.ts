import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";


export default async function authUser( req: Request, resp: Response, next: NextFunction): Promise<void> {
    
    const authData = req.headers

    console.log("%c"+`[AUTH LOG]csome try connect \n ${authData.authorization}`, 'background-color: red')
    console.log("%c"+`[AUTH LOG]${JSON.stringify(authData)}\n\n${JSON.stringify(req.body)}`, 'background-color: red')

    if ( !authData.authorization ){
        resp.json({message:"non autorizate. Empty token", detail: `${JSON.stringify(authData)}\n\n${JSON.stringify(req.body)}`}).status(401)
        return
    }
    
    verify(authData.authorization.split(' ')[1], env.TOKEN_SECRET, (err, decode)=>{
        if ( err ) {
            resp.json({message:"non autorizate. None valide token", detail: `${JSON.stringify(authData)}\n\n${JSON.stringify(req.body)}`}).status(403)
            return
        }
		console.log("user is autentificate")
        next()
    })
    return
}
