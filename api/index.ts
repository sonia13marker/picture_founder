import { Router, urlencoded } from "express"
import userRoute from "./user"
import authRoute from "./auth"

const route = Router()

route.use("/user", userRoute)
route.use("/auth", urlencoded({ extended: false }) ,authRoute)


export default route