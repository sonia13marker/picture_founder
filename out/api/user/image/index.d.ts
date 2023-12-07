import { Request, Response } from "express";
declare function imageGet(req: Request, resp: Response): Promise<void>;
declare function imagePost(req: Request, resp: Response): Promise<void>;
declare function imageDelete(req: Request, resp: Response): Promise<void>;
declare function fullImageGet(req: Request, resp: Response): Promise<void>;
declare function imageEdit(req: Request, resp: Response): Promise<void>;
declare function getImageFile(req: Request, resp: Response): Promise<void>;
export { imageGet, imagePost, imageDelete, fullImageGet, imageEdit, getImageFile };
