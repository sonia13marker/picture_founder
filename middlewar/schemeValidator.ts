import { NextFunction } from "express";
import { ObjectSchema } from "joi"

export  default function( req: Request, resp: Response, schema: ObjectSchema, data: any,  next: NextFunction){
    if ( !schema.validate(data).error ) {
        next();
    }

    

}