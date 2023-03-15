import { IsDate, IsUUID } from "class-validator";

export class CreateBookingDto{
    @IsUUID()
    public userId: string;

    @IsUUID()
    public roomId: string;

    @IsDate()
    public bookingDate: string
}