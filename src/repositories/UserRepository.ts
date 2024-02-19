import { IUpdate, IUpdateDTO, IUserCreate } from "../dto/IUserCreate";
import { prisma } from "../infra/database/prismaService";

export class UserRepository {
    async create(data: IUserCreate){
        const result = await prisma.users.create({
            data,
        })
        return result
    }
    async findByEmail(email: string){
        const result = await prisma.users.findUnique({
            where: {
                email,
            }
        })
        return result
    }
    async findById(id: string){
        const result = await prisma.users.findUnique({
            where: {
              id, 
            }
        })
        return result
    }
    async update(data: IUpdateDTO) {
        const result = await prisma.users.update({
            where: {
                id: data.user_id,
            },
            data: {
                name: data.name,
                avatar_url: data.avatar_url
            }
        })

        return result
    } 
    async updatePassword(data: IUpdate) {
        const result = await prisma.users.update({
            where: {
                id: data.user_id,
            },
            data: {
                password: data.newPassword,
            }
        })

        return result
    } 
}