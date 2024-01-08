import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsString, Min } from "class-validator";
import { IncomeType } from "../income.entity";

export class CreateIncomeDto {
    @IsNumber()
    @Min(0)
    @ApiProperty()
    amount: number;

    @IsEnum(IncomeType)
    @ApiProperty()
    incomeType: IncomeType

    @IsString()
    @ApiProperty()
    title: string;

    @IsDateString()
    @ApiProperty()
    date: Date;
}