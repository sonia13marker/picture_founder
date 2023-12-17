import { Router, Request, Response } from "express"
import { sign } from "jsonwebtoken"
import { db_models } from "../../db"
import { env } from "../../env"
import * as Joi from "joi"
import cry from "crypto"
import fs from "fs"
import cookieParser from "cookie-parser"

const route = Router()

const UserInScheme = Joi.object({
  UserEmail: Joi.string().min(6).regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
  UserPassword: Joi.string().min(8).required()
})

route.post("/login", cookieParser(), async (req: Request, resp: Response): Promise<void> => {

  console.log(req.body);

  const userReq = UserInScheme.validate(req.body)

  if (userReq.error) {

    resp.status(400);
    resp.json({ message: "non valide data" });
    console.log(userReq.error.message);
    return

  }

   const hasUser = await db_models.UserModel.exists({ UserEmail: userReq.value.UserEmail })

   if (!hasUser) {
     resp.status(404);
     resp.json({ message: "user not found" })
     return
   }

  const userDb = await db_models.UserModel.find({ UserEmail: userReq.value.UserEmail });
  const passHash = cry.createHash("sha256").update(userReq.value.UserPassword).digest("hex");

  if (passHash !== userDb[0].UserPassword) {
    resp.status(404);
    resp.json({ message: "non valid password" })
    return
  }

  const token = sign({ id: userDb[0]._id, email: userDb[0].UserEmail }, env.TOKEN_SECRET, { expiresIn: "1d" });
  resp.cookie("token", token, {
    httpOnly: true
  });
  resp.status(200).json({
    message: "login success",
    userId: userDb[0]._id,
    UserEmail: userDb[0].UserEmail
  });
  console.log(`[LOG] user ${userDb[0].id} is login`);


})

route.post("/regis", async (req: Request, resp: Response): Promise<void> => {
  console.log("Try create user");

  let ValidateData = UserInScheme.validate(req.body)
  const userData = ValidateData.value
  const hasUser = await db_models.UserModel.exists({ UserEmail: userData.UserEmail })
  const tmpFiles = "uploads"

  if (ValidateData.error) {
    resp.status(400)
    resp.json({ message: "non valide data" })
    console.log(ValidateData.error.message);
    return
  }

  if (hasUser) {
    resp.status(400)
    resp.json({ message: "user is exist" })
    console.log("[ERR] try create exist user");
    return
  }

  const hash = cry.createHash('sha256');
  hash.update(ValidateData.value.UserPassword)

  userData.UserPassword = hash.digest('hex')

  let dbUser = await db_models.UserModel.create(userData)
  await fs.promises.mkdir(`${tmpFiles}/save/${dbUser._id}`, { recursive: true })

  console.log(`create new user ${dbUser.UserEmail}`);
  resp.json({ message: "complete user create", data: { "UserID": dbUser.id, "UserEmail": dbUser.UserEmail } })

})

route.post("/logout", async (req: Request, resp: Response): Promise<void> => {

})

export default route;
