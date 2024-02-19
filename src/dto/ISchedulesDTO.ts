export type IScheduleDTO = {
    name: string
    phone: string
    data: Date
}
export type IScheduleCreateDTO = {
    name: string
    phone: string
    data: Date
    user_Id: string
}
export type IIdAndDateDTO = {
    data: Date
    id: string
}