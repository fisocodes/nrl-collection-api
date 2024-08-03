import { Get, Controller, Query, Post, Body, ConflictException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signin.dto'
import { UsersService } from '../users/users.service'
import { NodemailerService } from '../nodemailer.service'
import { JwtService } from '@nestjs/jwt'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { PasswordConfirmationPipe } from '../users/pipes/password-confirmation.pipe'

@ApiTags( 'auth' )
@Controller( 'auth' )
export class AuthController
{
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private nodemailerService: NodemailerService,
        private jwtService: JwtService
    ) {}

    @Get( '/verify-email' )
    async verifyEmail(
        @Query( 'emailVerificationToken' ) emailVerificationToken: string
    ): Promise<User>
    {
        return this.authService.verifyEmail( emailVerificationToken )
    }

    @Post( 'resend-email-verification' )
    async resendEmailVerification(
        @Query( 'idOrEmailOrUsername' ) idOrEmailOrUsername: string
    ): Promise<User>
    {
        const foundUser = await this.usersService.readOne( idOrEmailOrUsername )

        if( foundUser.isEmailVerified )
            throw new ConflictException( 'Email is already verified' )

        const emailVerificationToken = await this.jwtService.signAsync( { sub: foundUser.id } )

        await this.nodemailerService.sendVerificationEmail( foundUser.email, emailVerificationToken )

        return foundUser
    }

    @Post( 'reset-password' )
    async resetPassword(
        @Query( 'passwordResetToken' ) passwordResetToken: string,
        @Body( new PasswordConfirmationPipe() ) body: ResetPasswordDto
    )
    {
        this.authService.resetPassword( passwordResetToken, body.password )
    }

    @Post( '/sign-in' )
    async signIn( @Body() body: SignInDto ): Promise<{ access_token: string }>
    {
        return await this.authService.signIn( body.usernameOrEmail, body.password )
    }
}