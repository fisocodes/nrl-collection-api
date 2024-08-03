import { IsNotEmpty, IsString, Matches, Length } from 'class-validator'

export class ResetPasswordDto
{
    @Matches( /[\W_]/, { message: 'password must contain at least one special character' } )
    @Matches( /\d/, { message: 'password must contain at least one digit' } )
    @Matches( /[A-Z]/, { message: 'password must contain at least one uppercase letter' } )
    @Matches( /[a-z]/, { message: 'password must contain at least one lowercase letter' } )
    @Length( 8, 15 )
    @IsString()
    @IsNotEmpty()
    password: string

    @Matches( /[\W_]/, { message: 'password must contain at least one special character' } )
    @Matches( /\d/, { message: 'password must contain at least one digit' } )
    @Matches( /[A-Z]/, { message: 'password must contain at least one uppercase letter' } )
    @Matches( /[a-z]/, { message: 'password must contain at least one lowercase letter' } )
    @Length( 8, 15 )
    @IsString()
    @IsNotEmpty()
    confirmPassword: string
}