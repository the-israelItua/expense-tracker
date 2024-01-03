import { IsEmail,  IsString, MaxLength, MinLength } from "class-validator";

export class FindUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(11)
    @MinLength(11)
    phoneNumber: string;
}