import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import {  AuthDTO, IUpdate, IUserCreate, IUserId} from "../dto/IUserCreate";


class UserController {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }
    index(){}
    show(){}
    async store(request: Request, response: Response, next: NextFunction){
        const data:IUserCreate = request.body
        try {
            const result = await this.userService.create(data)
            return response.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async auth(request: Request, response: Response, next: NextFunction){
        const auth: AuthDTO = request.body
        try {
            const result = await this.userService.auth(auth)
            return response.json(result)
        } catch (error) {
            next(error)
        }
    }
    async refresh(request: Request, response: Response, next: NextFunction) {
        const {refresh_token} = request.body
        try {
            const result = await this.userService.refresh(refresh_token)
            return response.json(result)
        } catch (error) {
            next(error)
        }
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const data: IUpdate = request.body
        const reqUserId: IUserId = request
        try {
            const result = await this.userService.update({
                ...data,
                user_id: reqUserId.user_id,
                avatar_url: request.file}
                )
            return response.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
export {UserController}