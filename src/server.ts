import  express, { Application, NextFunction, Request, Response }  from "express";
import { UserRoutes } from "./routes/users.routes";
import { SchedulesRoutes } from "./routes/schedules.routes";
import cors from 'cors'

const app:Application = express()

app.use(cors() )
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const usersRoutes = new UserRoutes().getRoutes()
const schedulesRoutes = new SchedulesRoutes().getRoutes()

app.use('/user', usersRoutes)
app.use('/schedule', schedulesRoutes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            message: err.message
        })
    }
    return response.status(500).json({
        message: 'Intenal server error'
    })
})


app.listen(2000, () => console.log("Server is prestando"))