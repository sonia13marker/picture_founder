import { Router, Request, Response } from "express"
import { UserScheme } from "../dto/loginDto"
import { ForgotPass, LoginUser, regisUser } from "../service"
import { AuthCustomError } from "../../../exceptions/AuthExceptions"
import { successLoginData } from "../../../dto/UserDataDto"
import { MyError, MyLogController } from "../../../utils/CustomLog"
import { CustomError } from "../../../exceptions/ExampleError"
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
    MyError(`error on login. Invalide data: \n${userReq.error.message}`);
    return

  }

  LoginUser(userData.userEmail, userData.userPassword)
  .then( (val: successLoginData) => {
    resp.json({data: val, message: "login success"}).status(200);
    MyLogController(`user ${userData.userEmail} is login`)
  })
  .catch( ( err: AuthCustomError ) => {
    resp.statusCode = err.statusCode || 500;
    resp.json({code: err.code, message: err.message, detail: err.detail});
  })

})


//регистрация
route.post("/regis", async (req: Request, resp: Response): Promise<void> => {
  MyLogController("Try create user");

  let ValidateData = UserScheme.validate(req.body)
  const userData = ValidateData.value

  if (ValidateData.error) {
    resp.status(400);
    resp.json({ code: 400, message: "non valide data", detail: ValidateData.error.message });
    MyError(`error on login. Invalide data: \n${ValidateData.error.message}`);
    return
  }

  regisUser(userData!.userEmail, userData!.userPassword)
    .then(( ) => {
      resp.json({ code: 204, message: "complete user create" })
    })
    .catch((err: AuthCustomError) => {
      MyError(`error on registered user:\n${err}`);
      resp.statusCode = err.statusCode || 500;
      resp.json({code: err.code, message: err.message, detail: err.detail, userEmail: userData!.userEmail});
    })

})


//восстановление пароля
route.get("/forgotPass", async ( req: Request, resp: Response)=>{
  const userEmail = <string>req.query.email

  if ( !userEmail ){
    resp.statusCode = 400;
    resp.json({code: 103, message: "empty user email"});
    return
  }

  ForgotPass(userEmail)
  .then( () => {
    resp.statusCode = 200
    resp.json({message: "successfull. See email"})
  })
  .catch( (err: CustomError) => { detail: err.detail
    MyError(`error on forgot pass:\n${err}`);
    resp.statusCode = err.statusCode | 400;
    resp.json({code: err.code, message: err.message, detail: err.detail});
  })
})

route.post("/logout", async (req: Request, resp: Response): Promise<void> => {

})

export default route;
