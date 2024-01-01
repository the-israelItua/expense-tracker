import { IsEmail,  IsString, MaxLength, MinLength } from "class-validator";

export class FindUserDto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(11)
    @MinLength(11)
    phoneNumber: string;
}