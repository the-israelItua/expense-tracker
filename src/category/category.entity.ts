import { Exclude } from "class-transformer";
import { Expense } from "src/expense/expense.entity";
import { User } from "src/user/user.entity";
import {  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Index({ fulltext: true })
    @Column()
    name: string;

    @Exclude()
    @CreateDateColumn()
    createdDate: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedDate: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedDate: Date;

    @ManyToOne(() => User, (user) => user.category)
    user: User;

    @Column()
    userId: string;

    @OneToMany(() => Expense, (expense) => expense.category)
    expense: Expense[]
}

