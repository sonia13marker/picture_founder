import { Router, urlencoded } from "express"
import userRoute from "./user"
import authRoute from "./auth"
import authUser from "../middlewar/authUser"
import cookieParser from "cookie-parser"

const route = Router()

route.use("/user", cookieParser(), authUser, userRoute)
route.use("/auth", cookieParser(), urlencoded({ extended: false }) ,authRoute)


export default route