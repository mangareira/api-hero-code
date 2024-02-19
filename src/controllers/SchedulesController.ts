import { NextFunction, Request, Response } from "express";
import { IScheduleDTO } from "../dto/ISchedulesDTO";
import { SchedulesServices } from "../services/SchedulesService";
import { parseISO } from "date-fns";

export class SchedulesController {
    private scheduleService: SchedulesServices
    constructor() {
        this.scheduleService = new SchedulesServices()
    }
    async store(request: Request, response: Response, next: NextFunction) {
        const data: IScheduleDTO = request.body
        const {user_id} = request
        try {
            const result = await this.scheduleService.create({
                ...data,
                user_Id: user_id
            })
            return response.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async index(request: Request, response: Response, next: NextFunction) {
        const { data } = request.query
        const parseData = data ? parseISO(data.toString()) : new Date()
        try {
            const result = await this.scheduleService.index(parseData)
            return response.json(result)
        } catch (error) {
            next(error)
        }
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params
        const {data} = request.body
        const {user_id} = request
        try {
            const result = await this.scheduleService.update({id, data}, user_id)
            return response.json(result)
        } catch (error) {
            next(error)
        }
    }
    async delete(request: Request, response: Response, next: NextFunction) {}
}