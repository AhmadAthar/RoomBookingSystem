import { IsDate, IsUUID } from "class-validator";

export class CheckRoomAvailabilityDto{

    
    
    public roomId?: string;

    
    public date?: Date
}