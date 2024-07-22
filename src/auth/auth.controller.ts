import { Get, Controller, Query, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signin.dto'

@ApiTags( 'auth' )
@Controller( 'auth' )
export class AuthController
{
    constructor( private authService: AuthService ) {}

    @Get( '/verify-email' )
    async verifyEmail(
        @Query( 'emailVerificationToken' ) emailVerificationToken: string
    ): Promise<User>
    {
        return this.authService.verifyEmail( emailVerificationToken )
    }

    @Post( '/sign-in' )
    async signIn( @Body() body: SignInDto ): Promise<{ access_token: string }>
    {
        return await this.authService.signIn( body.usernameOrEmail, body.password )
    }
}