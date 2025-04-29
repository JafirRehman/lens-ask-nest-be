import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsOptional,
    isNotEmpty,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'first_name is required' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    password: string;

    @IsEmail()
    @IsNotEmpty({ message: 'email is required' })
    email: string;
}