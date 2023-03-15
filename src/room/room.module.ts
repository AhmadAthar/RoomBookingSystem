import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingModule } from "src/booking/booking.module";
import { RoomController } from "./room.controller";
import { Room } from "./room.entity";
import { RoomService } from "./room.service";

@Module({
    imports: [TypeOrmModule.forFeature([Room]), 
    forwardRef( () => BookingModule)],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [RoomService]
})
export class RoomModule{

}