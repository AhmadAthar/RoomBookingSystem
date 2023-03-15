import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Observable } from "rxjs";
import { IUser } from "shared/user.interface";
import { ApplicationCustomError } from "src/error";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{

    public constructor(
        private readonly userService: UserService
    ){}
    
    @Get('getUserById')
    public getUser(
        @Query('id') id: string
    ): Observable<IUser>{
        return this.userService.getUserById(id)
    }

    @Post()
    public createUser(
        @Body() createUserDto: CreateUserDto
    ): Observable<IUser | ApplicationCustomError>{
        return this.userService.createUser(createUserDto)
    }

    @Put(':id')
    public updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Observable<IUser | ApplicationCustomError>{
        return this.userService.updateUser(id, updateUserDto)
    }

    
}