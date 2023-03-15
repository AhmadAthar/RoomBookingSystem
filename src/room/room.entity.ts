import { IBooking } from "shared/booking.interface";
import { IRoom } from "shared/room.interface";
import { Booking } from "src/booking/booking.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room implements IRoom{

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    public roomNumber: string;

    @Column({ unique: true })
    public phone: string;

    @Column('numeric')
    public createdAt: number;

    @Column('numeric', { nullable: true })
    public lastUpdatedAt?: number;

    @OneToMany( () => Booking, booking => booking.room)
    public bookings: IBooking[];

    @BeforeInsert()
    public addTime(){
        this.createdAt = new Date().getTime()
    }

    @BeforeUpdate()
    public updateTime(){
        this.lastUpdatedAt = new Date().getTime()
    }
}