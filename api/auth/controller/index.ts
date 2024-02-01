import { Router, Request, Response } from "express"
import { UserScheme } from "../dto/loginDto"
import { LoginUser, regisUser } from "../service"
import { AuthCustomError } from "../../../exceptions/AuthExceptions"
import { successLoginData } from "../../../dto/UserDataDto"
// import cookieParser from "cookie-parser"

const route = Router()

//логин пользователя
//при логине выдаётся jwt токен
route.post("/login", /*cookieParser(),*/ async (req: Request, resp: Response): Promise<void> => {

  const userReq = UserScheme.validate(req.body);
  const userData = userReq.value;

  if (userReq.error) {

    resp.status(400);
    resp.json({ message: "non valide data", detail: userReq.error.message });
    console.log("[ERR] error on login. Invalide data: \n", userReq.error.message);
    return

  }

  LoginUser(userData.userEmail, userData.userPassword)
  .then( (val: successLoginData) => {
    resp.json({data: val, message: "login success"}).status(200);
    console.log(`user ${userData.userEmail} is login`)
  })
  .catch( ( err: AuthCustomError ) => {
      resp.json({code: err.code, message: err.message, detail: err.detail}).status(err.statusCode)
  })

})


//регистрация
route.post("/regis", async (req: Request, resp: Response): Promise<void> => {
  console.log("Try create user");

  let ValidateData = UserScheme.validate(req.body)
  const userData = ValidateData.value

  if (ValidateData.error) {
    resp.status(400);
    resp.json({ code: 400, message: "non valide data", detail: ValidateData.error.message });
    console.log("[ERR] error on login. Invalide data: \n", ValidateData.error.message);
    return
  }

  regisUser(userData!.userEmail, userData!.userPassword)
    .then(() => {
      resp.json({ code: 204, message: "complete user create" })
    })
    .catch((err: AuthCustomError) => {
      console.log("[ERR] error on registered user:\n", err);
      resp.json({code: err.code, message: err.message, detail: err.detail}).status(err.statusCode);

    })

})

route.post("/logout", async (req: Request, resp: Response): Promise<void> => {

})

export default route;