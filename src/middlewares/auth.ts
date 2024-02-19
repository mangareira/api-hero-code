import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "../dto/IUserCreate";

export class AuthMiddleware {
    async auth(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers.authorization
        if (!authHeader) {
            return response.status(401).json({
                code: 'token.missing',
                message: " token missing"
            })
        }    
        const [, token] = authHeader.split(' ')
        

        try {
            let secretKey: string | undefined = process.env.JWT_SECRET
            if (!secretKey) {
                throw new Error('No secret key')
            }
            const { sub } = verify(token, secretKey ) as IPayload
            request.user_id = sub
            return next()
        } catch (error) {
            return response.status(401).json({
                code: 'token.expired',
                message: 'token expired'
            })
        }
    }
}