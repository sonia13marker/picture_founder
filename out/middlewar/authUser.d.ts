import { NextFunction, Response, Request } from "express";
export default function authUser(req: Request, resp: Response, next: NextFunction): Promise<void>;
