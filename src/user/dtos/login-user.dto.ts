import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString} from "class-validator";

export class LoginUserDto {
    @IsString()
    @ApiProperty()
    password: string;

    @IsEmail()
    @ApiProperty()
    email: string;
}