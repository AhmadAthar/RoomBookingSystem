import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking/booking.entity';
import { BookingModule } from './booking/booking.module';
import { Room } from './room/room.entity';
import { RoomModule } from './room/room.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      host: 'localhost',
      database: 'roomsBooking',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      logging: false
    }),
    UserModule,
    RoomModule,
    BookingModule
  ],
})
export class AppModule { }
