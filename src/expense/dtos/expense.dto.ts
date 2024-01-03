import { Expose, Transform } from "class-transformer";

export class ExpenseDto {
    @Expose()
    id: string;

    @Transform(({obj}) => obj.user?.id)
    @Expose()
    userId: string;
    @Transform(({obj}) => obj.category?.id)
    @Expose()
    categoryId: string;

    @Expose()
    amount: number;

    @Expose()
    title: string;

    @Expose()
    date: Date;
}