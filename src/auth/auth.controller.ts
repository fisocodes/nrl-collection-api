import { Get, Controller, Query, UnauthorizedException, ConflictException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '@prisma/client'

@ApiTags( 'auth' )
@Controller( 'auth' )
export class AuthController
{
    constructor( private jwtService: JwtService, private usersService: UsersService ) {}

    @Get( '/verify-email' )
    async verifyEmail(
        @Query( 'emailVerificationToken' ) emailVerificationToken: string
    ): Promise<User>
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
}