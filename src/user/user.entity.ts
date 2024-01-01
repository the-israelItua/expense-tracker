import { Exclude } from "class-transformer";
import {  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Index({ fulltext: true })
  @Column()
    username: string;

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

  @Exclude()
  @CreateDateColumn()
  createdDate: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedDate: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedDate: Date;
}

