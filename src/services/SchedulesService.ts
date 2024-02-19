import { getHours, isBefore, startOfHour } from "date-fns";
import { IIdAndDateDTO, IScheduleCreateDTO } from "../dto/ISchedulesDTO";
import { SchedulesRepository } from "../repositories/ServicesRepository";

export class SchedulesServices {
    private schedulesRepository: SchedulesRepository
    constructor() {
        this.schedulesRepository = new SchedulesRepository()
    }
    async create(data: IScheduleCreateDTO) {
        const dateFormatted = new Date(data.data)

        const hourStart = startOfHour(dateFormatted)

        const hour = getHours(hourStart)
        if(hour<= 9 || hour>= 19) {
            throw new Error('Create a schedule between 9 and 19 ')
        }
        if(isBefore(hourStart, new Date())) {
            throw new Error('It is not allowed to schedule old date')
        }

        const checkIsAvailable = await this.schedulesRepository.find(hourStart, data.user_Id)

        if(checkIsAvailable) {
            throw new Error('Schedule date is not available')
        }

        const create = await this.schedulesRepository.create({
            ...data,
            data: hourStart,
        })
        return create
    }
    async index(data: Date) {
        const result = await this.schedulesRepository.findAll(data)
        return result
    }
    async update({id, data}: IIdAndDateDTO, user_id: string) {
        const dateFormatted = new Date(data)
        const hourStart = startOfHour(dateFormatted)
        if(isBefore(hourStart, new Date())) {
            throw new Error('It is not allowed to schedule old date')
        }

        const checkIsAvailable = await this.schedulesRepository.find(hourStart, user_id)

        if(checkIsAvailable) {
            throw new Error('Schedule date is not available')
        }
        const result = await this.schedulesRepository.update({id, data})
        return result
    }
}