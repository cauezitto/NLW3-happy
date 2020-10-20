import {getRepository} from 'typeorm'
import Orphanage from '../models/Orphanage'
import {Request, Response} from 'express'
import orphanageView from '../views/orphanagesView'
import orphanagesView from '../views/orphanagesView'
import * as Yup from 'yup'

export default {

    async index(request: Request, response:Response){
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return response.json(orphanagesView.renderMany(orphanages))
    },

    async show(request: Request, response:Response){
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.findOneOrFail(request.params.id, {
            relations: ['images']
        })

        return response.json(orphanagesView.render(orphanages))
    },

    async create(request: Request, response: Response){
        
    const {
        name, 
        latitude, 
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
        } = request.body

        const orphanageRepository = getRepository(Orphanage)

        const requestImages = request.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        })
        
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true'? true : false,
            images
        }

        const scheema = Yup.object().shape({
            name: Yup.string().required(),
            latitude:  Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
               path: Yup.string().required() 
            }))
        })

        await scheema.validate(data, {
            abortEarly: false //faz retornar todos os error de uma vez
        })
        const orphanage = orphanageRepository.create(data)

        await orphanageRepository.save(orphanage)

        return response.status(201).json(orphanage)

    }
}