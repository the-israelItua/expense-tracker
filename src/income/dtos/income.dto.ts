import { Expose, Transform } from "class-transformer";
import { IncomeType } from "../income.entity";

export class IncomeDto {
    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    amount: number;

    @Expose()
    title: string;

    @Expose()
    date: Date;

    @Expose()
    incomeType: IncomeType;
}