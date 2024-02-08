import { Router, urlencoded } from "express"
import userRoute from "./user/contoller"
import authRoute from "./auth/controller"
import createLinkRoute from "./ShareImage/controller/CreateLinkController"
import { hasUser } from "../middlewar/hasUser"
// import cookieParser from "cookie-parser"

const route = Router()

route.use("/user", /*cookieParser(),*/ /*authUser,*/ userRoute)
route.use("/auth", /*cookieParser(),*/ urlencoded({ extended: false }) ,authRoute)
route.use("/share/:id/getLink", hasUser, createLinkRoute);


export default route
