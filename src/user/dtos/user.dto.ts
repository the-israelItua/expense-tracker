import { Expose, Transform } from "class-transformer";

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    totalIncome: number;

    @Expose()
    totalExpenses: number;

    @Expose()
    balance: number;

    @Expose()
    createdDate: Date;

    @Expose()
    updatedDate: Date;
}