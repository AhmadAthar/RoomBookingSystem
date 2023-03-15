import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { catchError, forkJoin, from, map, Observable, of, switchMap } from "rxjs";
import { IBooking } from "shared/booking.interface";
import { HttpStatusCodeEnumerator } from "shared/http-codes.enum";
import { IRoom } from "shared/room.interface";
import { IUser } from "shared/user.interface";
import { ApplicationCustomError, CustomErrorObservable, CustomErrorOperator } from "src/error";
import { RoomService } from "src/room/room.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingService {
    public constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        private readonly userService: UserService,
        @Inject( forwardRef( () => RoomService))
        private readonly roomService: RoomService
    ) { }

    public getBookingById(id: string): Observable<IBooking> {
        return from(this.bookingRepository.findOne({
            where: {
                id
            }
        }))
    }

    public checkAndCreateBooking(createBookingDto: CreateBookingDto): Observable<IBooking | ApplicationCustomError>{
        const { roomId, bookingDate } = createBookingDto
        return this.getBookingBydRoomIdAndDate( roomId, bookingDate).pipe(
            switchMap(
                (booking: IBooking): Observable<IBooking | ApplicationCustomError> => booking ? CustomErrorObservable(HttpStatusCodeEnumerator.CONFLICT) : this.createBooking(createBookingDto)
            ),
            catchError(CustomErrorOperator(HttpStatusCodeEnumerator.CONFLICT))
        )
    }

    public createBooking({ roomId, userId, bookingDate }: CreateBookingDto) {
        return forkJoin({
            user: this.userService.getUserById(userId),
            room: this.roomService.getRoomById(roomId)
        }).pipe(
            switchMap(
                ({ user, room }: { user: IUser, room: IRoom }): Observable<IBooking> => from(this.bookingRepository.save(
                    this.bookingRepository.create({
                        user,
                        room,
                        bookingDate
                    })
                ))
            )
        )
    }

    public getBookingBydRoomIdAndDate(roomId: string, bookingDate: string): Observable<IBooking> {
        return from(this.bookingRepository.findOne({
            where: {
                roomId,
                bookingDate: new Date(bookingDate)
            }
        }))
    }

    public getBookingsByDate(bookingDate: string): Observable<IBooking[]>{
        return from(this.bookingRepository.find({
            where: {
                bookingDate: new Date(bookingDate)
            }
        })).pipe(
            map(
                (bookings: IBooking[]): IBooking[] => bookings.length ? bookings : []
            )
        )
    }

    public getRoomIdsBookedByDate(bookingDate: string): Observable<string[]>{
        return from(this.bookingRepository.find({
            where: {
                bookingDate: new Date(bookingDate),
            }
        })).pipe(
            map(
                (bookings: IBooking[]): string[] => bookings.length ? bookings.map(booking => booking.roomId) : []
            )
        )
    }
}