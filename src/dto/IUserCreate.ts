import { stringTo2048 } from "aws-sdk/clients/customerprofiles"

export type IUserCreate = {
    name: string
    email: string
    password: string
}
export interface IUpdate  {
    name: string
    oldPassword: string
    newPassword: string
    avatar_url?: FileDTO
    user_id: string
}
export type IUpdateDTO = {
    name: string
    newPassword: string
    avatar_url: string
    user_id: string
}
export type IUserId = {
    user_id: string
}
export type FileDTO = {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
}

export type AuthDTO = {
    email: string
    password: string
}

export type IPayload = {
    sub: string
}