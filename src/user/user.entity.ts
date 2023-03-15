import { IUser } from "shared/user.interface";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ unique: true })
    public username?: string;

    @Column({ unique: true })
    public email?: string;

    @Column('numeric')
    public createdAt?: number;

    @Column('numeric', { nullable: true })
    public lastUpdatedAt?: number;

    @BeforeInsert()
    public addTime() {
        this.createdAt = new Date().getTime()
    }

    @BeforeUpdate()
    public updateTime() {
        this.lastUpdatedAt = new Date().getTime()
    }
}