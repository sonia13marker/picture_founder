import { ImageData } from "../../../dto/ImageDataDto"


export interface UserGetImageData{
    images: ImageData[]
    imageCount?: number
}