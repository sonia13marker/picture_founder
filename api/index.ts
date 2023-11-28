import { Router, urlencoded } from "express"
import userRoute from "./user"
import authRoute from "./auth"
import authUser from "../middlewar/authUser"

const route = Router()

route.use("/user", authUser, userRoute)
route.use("/auth", urlencoded({ extended: false }) ,authRoute)


export default route