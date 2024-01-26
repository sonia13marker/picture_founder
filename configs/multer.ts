import { diskStorage } from "multer";


export const stConf = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/tmp");
    },
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
})
