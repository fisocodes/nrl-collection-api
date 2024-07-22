import { IsNotEmpty, IsString } from 'class-validator'

export class SignInDto
{
    @IsString()
    @IsNotEmpty()
    usernameOrEmail: string

    @IsString()
    @IsNotEmpty()
    password: string
}