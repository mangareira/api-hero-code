import { endOfDay, startOfDay } from "date-fns";
import { IIdAndDateDTO, IScheduleCreateDTO } from "../dto/ISchedulesDTO";
import { prisma } from "../infra/database/prismaService";

export class SchedulesRepository{
    async create(data: IScheduleCreateDTO) {
        const result = await prisma.schedule.create({
            data,
        })
        return result
    }
    async find(data: Date, user_Id: string) {
        const result = await prisma.schedule.findFirst({
            where: {
                data,
                user_Id,
            }
        })
        return result
    }
    async findAll(data: Date) {
        const result = await prisma.schedule.findMany({
            where: {
                data: {
                    gte:startOfDay(data),
                    lt: endOfDay(data)
                }
            },
            orderBy: {
                data: 'asc'
            }
        })
        return result
    }
    async update({id, data}: IIdAndDateDTO) {
        const result = await prisma.schedule.update({
            where: {
                id,
            },
            data: {
                data,
            }
        })
        return result
    }
}