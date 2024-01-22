import { Router, Request, Response } from "express"
import { UserScheme } from "../../../dto/loginDto"
import { UserAuth } from "../model"
import { customError, errorType } from "../../exceptions/authExceptions"
import { successLoginData } from "../../../dto/userDataDto"
// import cookieParser from "cookie-parser"

const route = Router()

route.post("/login", /*cookieParser(),*/ async (req: Request, resp: Response): Promise<void> => {

  const userReq = UserScheme.validate(req.body);
  const userData = userReq.value;

  if (userReq.error) {

    resp.status(400);
    resp.json({ message: "non valide data", detail: userReq.error.message });
    console.log("[ERR] error on login. Invalide data: \n", userReq.error.message);
    return

  }

  UserAuth.LoginUser(userData.userEmail, userData.userPassword)
  .then( (val: successLoginData) => {
    resp.json(val).status(200);
  })
  .catch( ( err: customError ) => {
    if ( err.errCode === errorType.USER_NOT_FOUND ){
      resp.json({code: 404, message: err.message, detail: ""})
    }
  })

})

route.post("/regis", async (req: Request, resp: Response): Promise<void> => {
  console.log("Try create user");

  let ValidateData = UserScheme.validate(req.body)
  const userData = ValidateData.value

  if (ValidateData.error) {
    resp.status(400);
    resp.json({ message: "non valide data", detail: ValidateData.error.message });
    console.log("[ERR] error on login. Invalide data: \n", ValidateData.error.message);
    return
  }

  UserAuth.regisUser(userData!.userEmail, userData!.userPassword)
    .then(() => {
      resp.json({ code: 204, message: "complete user create" })
    })
    .catch((err: customError) => {
      console.log("[ERR] error on registered user:\n", err);
      if (err.errCode === errorType.USER_IS_EXIST) {
        resp.json({ code: 409, message: err.message, detail: "try create user what already exist" }).status(409);
        return
      }

      resp.json({ code: 501, message: err.message, detail: "tyr create user what already exist" }).status(409);

    })

})

route.post("/logout", async (req: Request, resp: Response): Promise<void> => {

})

export default route;
