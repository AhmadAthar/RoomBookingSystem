import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, from, map, Observable, switchMap } from "rxjs";
import { HttpStatusCodeEnumerator } from "shared/http-codes.enum";
import { IRoom } from "shared/room.interface";
import { BookingService } from "src/booking/booking.service";
import { ApplicationCustomError, CustomErrorOperator } from "src/error";
import { In, Not, Repository } from "typeorm";
import { CheckRoomAvailabilityDto } from "./dto/check-room-availability.dto";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./room.entity";

@Injectable()
export class RoomService{
    
    public constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @Inject(forwardRef( () => BookingService))
        private readonly bookingService: BookingService
    ){}

    public getRoomById(id: string): Observable<IRoom>{
        return from(this.roomRepository.findOne({
            where:{
                id
            }
        }))
    }

    public createRoom(createRoomDto: CreateRoomDto): Observable<IRoom | ApplicationCustomError>{
        return from(this.roomRepository.save(
                this.roomRepository.create({
                    ...createRoomDto
                })
        )).pipe(
            catchError(CustomErrorOperator(HttpStatusCodeEnumerator.CONFLICT))
        )
    }

    public updateRoom(id: string, updateRoomDto: UpdateRoomDto): Observable<IRoom | ApplicationCustomError>{
        return from(this.roomRepository.findOne({
            where: {
                id
            }
        })).pipe(
            switchMap(
                (room: IRoom): Observable<IRoom> => from(this.roomRepository.save(
                    this.roomRepository.create({
                        ...room,
                        ...updateRoomDto
                    })
                ))
            ),
            catchError(CustomErrorOperator(HttpStatusCodeEnumerator.CONFLICT))

        )
    }

    public checkRoomAvailability({roomId, date}: CheckRoomAvailabilityDto): Observable<boolean | ApplicationCustomError>{
        return from(this.roomRepository.createQueryBuilder('room')
            .innerJoinAndSelect('room.bookings', 'booking')
            .where('room.id = :roomId AND booking.bookingDate = :date', { roomId, date})
            .getOne()
        ).pipe(
            map(
                (room: IRoom): boolean => room ? false : true
            ),
            catchError(CustomErrorOperator(HttpStatusCodeEnumerator.NOT_FOUND))
        )
    }

    public getRoomsAvailableByDate(bookingDate: string): Observable<IRoom[] | ApplicationCustomError>{
        return this.bookingService.getRoomIdsBookedByDate(bookingDate).pipe(
            switchMap(
                (roomIds: string[]) => from(this.roomRepository.find({
                    where: {
                        id: Not(In(roomIds))
                    }
                }))
            ),
            catchError(CustomErrorOperator(HttpStatusCodeEnumerator.NOT_FOUND))
        )
    }

}