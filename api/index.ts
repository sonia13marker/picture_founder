import { Router } from "express"
import userRoute from "./user"

const route = Router()

route.use("/user", userRoute)


export default route