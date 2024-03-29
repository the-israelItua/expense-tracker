import { Exclude } from "class-transformer";
import { Category } from "src/category/category.entity";
import { Expense } from "src/expense/expense.entity";
import { Income } from "src/income/income.entity";
import {  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Index({ fulltext: true })
    @Column()
    firstName: string;

    @Index({ fulltext: true })
    @Column()
    lastName: string;

    @Column()
    @Exclude()
    password: string;

    @Index({ fulltext: true })
    @Column({
      unique: true,
    })
    email: string;

    @Index({ fulltext: true })
    @Column({
      unique: true,
      nullable: true,
    })
    phoneNumber: string;

    @Column('float', {default: 0})
    totalIncome: number;
 
    @Column('float', {default: 0})
    totalExpenses: number;
 
    @Column('float', {default: 0})
    balance: number;

  @Exclude()
  @CreateDateColumn()
  createdDate: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedDate: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Category, (category) => category.user)
  category: Category[]

  @OneToMany(() => Expense, (expense) => expense.user)
  expense: Expense[]

  @OneToMany(() => Income, (income) => income.user)
  income: Income[]
}

