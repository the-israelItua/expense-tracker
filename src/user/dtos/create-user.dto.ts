import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,  IsOptional,  IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MaxLength(11)
    @MinLength(11)
    @IsOptional()
    @ApiProperty()
    phoneNumber: string;
}