import { IBooking } from "shared/booking.interface";
import { IRoom } from "shared/room.interface";
import { IUser } from "shared/user.interface";
import { Room } from "src/room/room.entity";
import { User } from "src/user/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking implements IBooking {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('uuid')
    public roomId: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'roomId' })
    public room: IRoom;

    @Column('uuid')
    public userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    public user: IUser;

    @Column('date')
    public bookingDate: Date;

    @Column('numeric')
    public createdAt: number;

    @Column('numeric', { nullable: true })
    public lastUpdatedAt?: number;

    @BeforeInsert()
    public addTime() {
        this.createdAt = new Date().getTime();
    }

    @BeforeUpdate()
    public updateTime() {
        this.lastUpdatedAt = new Date().getTime();
    }
}