import { IsEmail,  IsOptional,  IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(11)
    @MinLength(11)
    @IsOptional()
    phoneNumber: string;
}