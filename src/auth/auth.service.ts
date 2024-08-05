import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

@Injectable()
export class AuthService
{
    constructor( private usersService: UsersService, private jwtService: JwtService ) {}

    async verifyEmail( emailVerificationToken: string ): Promise<User>
    {
        try
        {
            await this.jwtService.verifyAsync( emailVerificationToken )
            const { sub: userId } = this.jwtService.decode( emailVerificationToken )

            const { isEmailVerified } = await this.usersService.readOne( userId )

            if( isEmailVerified )
                throw new ConflictException( 'Email already verified' )

            const updatedUser = await this.usersService.update( userId, {
                isEmailVerified: true
            } )

            return updatedUser
        }
        catch( e: any )
        {
            console.log( e.message )
            throw new UnauthorizedException( e.message )
        }
    }

    async resetPassword( resetPasswordToken: string, password: string )
    {
        try
        {
            await this.jwtService.verifyAsync( resetPasswordToken )
            const { sub: userId } = this.jwtService.decode( resetPasswordToken )

            const updatedUser = await this.usersService.updatePassword( userId, password )

            return updatedUser
        } catch( e: any )
        {
            console.log( e.message )
            throw new UnauthorizedException( e.message )
        }
    }

    async signIn( usernameOrEmail: string, password: string ): Promise<{ access_token: string }>
    {
        const foundUser = await this.usersService.readOne( usernameOrEmail )

        if( !foundUser.isEmailVerified )
            throw new UnauthorizedException( 'Email is not verififed' )

        if( !await compare( password, foundUser.password ) )
            throw new UnauthorizedException( 'Invalid password' )

        return { access_token: await this.jwtService.signAsync( { sub: foundUser.id } ) }
    }
}