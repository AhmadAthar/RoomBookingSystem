import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomModule } from "src/room/room.module";
import { UserModule } from "src/user/user.module";
import { BookingController } from "./booking.controller";
import { Booking } from "./booking.entity";
import { BookingService } from "./booking.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Booking]),
        UserModule,
        forwardRef(() => RoomModule)
    ],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService]
})
export class BookingModule {

}