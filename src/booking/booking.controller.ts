import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Observable } from "rxjs";
import { IBooking } from "shared/booking.interface";
import { ApplicationCustomError } from "src/error";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Controller('booking')
export class BookingController{
    public constructor(
        private readonly bookingService: BookingService
    ){}

    @Post()
    public createBookingDetails(
        @Body() createBookingDto: CreateBookingDto
    ): Observable<IBooking | ApplicationCustomError>{
        return this.bookingService.checkAndCreateBooking(createBookingDto)
    }

    
    @Get('getBookingsByDate')
    public getBookingsByDate(
        @Query('bookingDate') bookingDate: string
    ): Observable<IBooking[]>{
        return this.bookingService.getBookingsByDate(bookingDate)
    }

}