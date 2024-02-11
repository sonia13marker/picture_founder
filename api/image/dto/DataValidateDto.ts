import Joi from "joi"
import { MyFilter, FilterType } from "./FilterImageDto"
import { ImageData, ImageDataUpdate } from "../../../dto/ImageDataDto"


export const imagesGetScheme = Joi.object({
    searchQuery: Joi.optional(),
    filter: Joi.string().valid(...Object.values(MyFilter)).default("NONE"),
    type: Joi.string().valid(...Object.values(FilterType)).default("ALP"),
    offset: Joi.number().default(0),
    isFavorite: Joi.boolean().default(null)
})

export const ImageScheme = Joi.object({
    imageName: Joi.string().min(2),
    imageTags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string(), Joi.allow(null)),
    isFavorite: Joi.boolean().default(false)
})

export const ImageSchemeEdit = Joi.object({
    imageName: Joi.string().allow("", null),
    imageTags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string(), Joi.allow(null)),
    isFavorite: Joi.boolean().allow("", null)
})