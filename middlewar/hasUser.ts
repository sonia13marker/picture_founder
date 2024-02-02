import { NextFunction, Response, Request } from "express";
import { db_models } from "../db";

export async function hasUser ( req: Request, resp: Response, next: NextFunction): Promise<void>{
    const userId = req.params.id    
    try{
        const hasUser = await db_models.UserModel.exists({_id: userId})
    
        if ( !hasUser ){
            resp.status(401);
            resp.json({message: "user not found"});
            return
        }
        next()
    }
    catch ( err ){
        resp.status(400);
        resp.json({message: "user not found"});
        return
    }
}