import { Router } from "express";
import { UserController } from "../controllers/UserControllers";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/auth";

class UserRoutes {
    private router: Router
    private userController: UserController
    private authMiddleware: AuthMiddleware
    constructor(){
        this.router = Router(), 
        this.userController = new UserController()
        this.authMiddleware = new AuthMiddleware()
    }   
    getRoutes() {
        this.router.post(
            "/",
            this.userController.store.bind(this.userController)
        )
        this.router.put(
            "/",
            upload.single('avatar_url'), 
            this.authMiddleware.auth.bind(this.authMiddleware),
            this.userController.update.bind(this.userController)
        )
        this.router.post(
            "/auth", 
            this.userController.auth.bind(this.userController)
        )
        this.router.post(
            "/refresh", 
            this.userController.refresh.bind(this.userController)
        )
        return this.router
    }
}

export { UserRoutes }