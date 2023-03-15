import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UpdateRoomDto{
    @IsNotEmpty()
    public roomNumber?: string;

    @MinLength(11)
    @MaxLength(11)
    public phone?: string;
}