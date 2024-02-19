import { compare, hash } from "bcrypt"
import { AuthDTO, IUpdate, IUserCreate } from "../dto/IUserCreate"
import { UserRepository } from "../repositories/UserRepository"
import { s3 } from "../config/aws"
import {v4 as uuid} from "uuid"
import { sign, verify } from "jsonwebtoken"

export class UserService {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }
    async create(data: IUserCreate) {
        const findUser = await this.userRepository.findByEmail(data.email)
        if(findUser) {
            throw new Error('User exists')
        }

        const passwordHashed = await hash(data.password, 10)
        const create = await this.userRepository.create({
            ...data,
            password: passwordHashed,
        })
        return create
    }
    async update(data: IUpdate) {
        let password
        if (data.oldPassword && data.newPassword) {
            const findUserById = await this.userRepository.findById(data.user_id)
            if(!findUserById) {
                throw new Error('User or password invalid.')
            }
            const passwordCompare = compare(data.oldPassword,findUserById.password )
            if (!passwordCompare) {
                throw new Error('Password invalid.')
            }
            password = await hash(data.newPassword, 10)
            await this.userRepository.updatePassword({
                ...data,
            })
        }
        if(data.avatar_url) {
            const avatar_urlData = data.avatar_url?.buffer
            const uploadS3 = await s3.upload({
                Bucket: 'agenda-api',
                Key: `${uuid()}-${data.avatar_url?.originalname}`,
                //ACL: 'public-read',
                Body: avatar_urlData,
            }).promise()
            console.log(uploadS3.Location)
            await this.userRepository.update({
                ...data,
                name: data.name, 
                user_id: data.user_id,
                avatar_url: uploadS3.Location
            })
        }
        return {
            message: 'User update successful'
        }

    }
    async auth(data: AuthDTO) {
        const findUser = await this.userRepository.findByEmail(data.email)
        if(!findUser) {
            throw new Error('User or password invalid.')
        }
        const passwordCompare = compare(data.password, findUser.password)
        if (!passwordCompare) {
            throw new Error('User or password invalid.')
        }

        let secretKey: string | undefined = process.env.JWT_SECRET
        if (!secretKey) {
            throw new Error('No secret key')
        }
        const token = sign({ email: data.email }, secretKey, {
            subject: findUser.id,
            expiresIn: '60s',
        })
        const refreshToken = sign({email: data.email}, secretKey, {
            subject: findUser.id,
            expiresIn: '7d'
        })
        return {
            token,
            refresh_token: refreshToken,
            user: {
                name: findUser.name,
                email: findUser.email,
            }
        }
    }
    async refresh(refresh_token: string) {
        if(!refresh_token) {
            throw new Error('refresh token is missing.')
        }
        let secretKey: string | undefined = process.env.JWT_SECRET
        if (!secretKey) {
            throw new Error('No secret key')
        }
        const verifyRefreshToken = verify(refresh_token,secretKey )
        const { sub } = verifyRefreshToken

        const newToken = sign({sub}, secretKey, {
            expiresIn: '7d'
        })
        return {
            token: newToken
        }
    }
}