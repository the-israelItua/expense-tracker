import { Expose, Transform } from "class-transformer";

export class ExpenseDto {
    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    categoryId: string;

    @Expose()
    amount: number;

    @Expose()
    title: string;

    @Expose()
    date: Date;


}