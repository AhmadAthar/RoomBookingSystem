import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateRoomDto{
    @IsNotEmpty()
    public roomNumber: string;

    @MinLength(11)
    @MaxLength(11)
    public phoneNumber: string;
}