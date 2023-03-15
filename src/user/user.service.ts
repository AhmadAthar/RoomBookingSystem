import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, from, Observable, of, switchMap } from "rxjs";
import { HttpStatusCodeEnumerator } from "shared/http-codes.enum";
import { IUser } from "shared/user.interface";
import { ApplicationCustomError, CustomErrorOperator } from "src/error";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    public getUserById(id: string): Observable<IUser>{
        return from(this.userRepository.findOne({
            where: {
                id
            }
        }))
    }

    public createUser(createUserDto: CreateUserDto): Observable<IUser | ApplicationCustomError>{
        return from(this.userRepository.save(
                this.userRepository.create({
                    ...createUserDto
                })
        )).pipe(
            catchError(CustomErrorOperator(HttpStatusCodeEnumerator.CONFLICT))
        )
    }

    public getUsers(): Observable<IUser[]>{
        return from(this.userRepository.find())
    }

    public updateUser(id: string, updateUserDto: UpdateUserDto): Observable<IUser | ApplicationCustomError>{
        return from(this.userRepository.findOne({
            where: {
                id
            }
        })).pipe(
            switchMap(
                (user: IUser): Observable<IUser> => from(this.userRepository.save(
                    this.userRepository.create({
                        ...user,
                        ...updateUserDto
                    })
                ))
            ),
            catchError(CustomErrorOperator(HttpStatusCodeEnumerator.NOT_FOUND))
        )
    }
}