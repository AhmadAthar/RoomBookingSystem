import { IsEmail, IsUUID, MinLength } from "class-validator";

export class UpdateUserDto{

    @MinLength(8)
    public username: string;

    @IsEmail()
    public email: string
}