import { IsDateString, IsNumber, IsString, Min } from "class-validator";
import { IncomeType } from "../income.entity";

export class CreateIncomeDto {
    @IsNumber()
    @Min(0)
    amount: number;

    @IsString()
    incomeType: IncomeType

    @IsString()
    title: string;

    @IsDateString()
    date: Date;
}