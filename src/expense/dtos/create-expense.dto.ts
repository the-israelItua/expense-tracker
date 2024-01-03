import { IsDateString, IsNumber, IsString, Min } from "class-validator";

export class CreateExpenseDto {
    @IsNumber()
    @Min(0)
    amount: number;

    @IsString()
    categoryId: string; 

    @IsString()
    title: string;

    @IsDateString()
    date: Date;
}