import { IRoom } from "./room.interface";
import { IUser } from "./user.interface";

export interface IBooking{
    id: string;
    userId: string;
    user?: IUser;
    roomId: string;
    room?: IRoom;
    bookingDate: Date;
    createdAt: number;
    lastUpdatedAt?: number;
}