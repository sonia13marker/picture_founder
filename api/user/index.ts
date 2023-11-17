import { Router, Request, Response } from "express"
import goose from "mongoose"
import { db_models } from "../../db"

const route = Router()

type newUserIn = {
    userName: String,
    userEmail: String,
    userPassword: String
}

route.get( "/:id", async ( req: Request, resp: Response ): Promise<void> => {
    
    const UserID = req.query.id;
    const getUser = await db_models.UserModel.findById(UserID)

    if ( !getUser ){
        let errText = `{"message": 'user ${UserID} not found'}`
        resp.statusCode = 404;
        resp.json(errText)
        console.error(errText);
    }

    resp.json(`{"UserID": "${getUser?.id}"}`)
} )


route.post( "/create", async ( req: Request, resp: Response ): Promise<void> => {
    const newUserData: newUserIn = JSON.parse(req.body)

    console.log(newUserData);
    
})


route.use("/:id/image")

export default route