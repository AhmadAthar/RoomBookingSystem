import { Body, Controller, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { IRoom } from "shared/room.interface";
import { ApplicationCustomError } from "src/error";
import { CheckRoomAvailabilityDto } from "./dto/check-room-availability.dto";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { RoomService } from "./room.service";

@Controller('room')
export class RoomController{
    
    public constructor(
        private readonly roomService: RoomService
    ){}

    @Get('getRoomById')
    public getRoomById(
        @Query('id') id: string
    ): Observable<IRoom>{
        return this.roomService.getRoomById(id)
    }

    @Post()
    public createRoom(
        @Body() createRoomDto: CreateRoomDto
    ): Observable<IRoom | ApplicationCustomError>{
        return this.roomService.createRoom(createRoomDto)
    }

    @Put(':id')
    public updateRoom(
        @Param('id') id: string,
        @Body() updateRoomDto: UpdateRoomDto
    ): Observable<IRoom | ApplicationCustomError>{
        return this.roomService.updateRoom(id, updateRoomDto)
    }


    @Get('getRoomAvailability')
    public checkRoomAvailability(
        @Body() checkRoomAvailabilityDto: CheckRoomAvailabilityDto
    ): Observable<boolean | ApplicationCustomError>{
        return this.roomService.checkRoomAvailability(checkRoomAvailabilityDto)
    }

    @Get('getRoomsAvailableByDate')
    public getRoomsAvailableByDate(
        @Query('bookingDate') bookingDate: string
    ): Observable<IRoom[] | ApplicationCustomError>{
        return this.roomService.getRoomsAvailableByDate(bookingDate)
    }

}