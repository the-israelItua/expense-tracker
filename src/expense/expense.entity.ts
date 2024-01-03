import { Exclude } from "class-transformer";
import { Category } from "src/category/category.entity";
import { User } from "src/user/user.entity";
import {  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Expense extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    amount: number;

    @Index({ fulltext: true })
    @Column()
    title: string;

    @Column()
    date: Date;

    @Exclude()
    @CreateDateColumn()
    createdDate: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedDate: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedDate: Date;

    @ManyToOne(() => User, (user) => user.expense)
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => Category, (category) => category.expense)
    category: Category;

    @Exclude()
    @Column()
    categoryId: string;
}

