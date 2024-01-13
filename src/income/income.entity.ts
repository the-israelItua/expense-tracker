import { Exclude } from "class-transformer";
import { User } from "src/user/user.entity";
import {  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum IncomeType {
    ONE_TIME="oneTime",
    RECURRING= "recurring"
}

@Entity()
export class Income extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('decimal', { precision: 6, scale: 2 })
    amount: number;

    @Index({ fulltext: true })
    @Column()
    title: string;

    @Column()
    date: Date;

    @Column({
        type: "enum",
        enum: IncomeType,
        default: IncomeType.ONE_TIME
    })
    incomeType: IncomeType;

    @Exclude()
    @CreateDateColumn()
    createdDate: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedDate: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedDate: Date;

    @ManyToOne(() => User, (user) => user.income)
    user: User;

    @Column()
    userId: string;
}

