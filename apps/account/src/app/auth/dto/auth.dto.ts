import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}

export class RegisterDto extends LoginDto {
    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    displayName?: string;
}