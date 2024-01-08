import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, Min } from "class-validator";

export class CreateExpenseDto {
    @IsNumber()
    @Min(0)
    @ApiProperty()
    amount: number;

    @IsString()
    @ApiProperty()
    categoryId: string; 

    @IsString()
    @ApiProperty()
    title: string;

    @IsDateString()
    @ApiProperty()
    date: Date;
}