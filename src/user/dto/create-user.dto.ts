import { ICreateUserDto } from "shared/user.interface";
import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto implements ICreateUserDto{
    
    @MinLength(8)
    public username: string;

    @IsEmail()
    email: string;
}