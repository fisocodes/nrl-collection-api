import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { PasswordConfirmationPipe } from './pipes/password-confirmation.pipe'
import { EmailConfirmationPipe } from './pipes/email-confirmation.pipe'

@ApiTags( 'users' )
@Controller( 'users' )
export class UsersController
{
    constructor( private usersService: UsersService ) {}

    @Post()
    async create( @Body( new EmailConfirmationPipe(), new PasswordConfirmationPipe() ) createUserDto: CreateUserDto )
    {
        return 'Users'
    }

    @Get( ':idOrEmailOrUsername' )
    readOne( @Param( 'idOrEmailOrUsername' ) idOrEmailOrUsername: string )
    {
        return 'Users'
    }

    //TODO Implement params and pipes
    @Get()
    readMany()
    {
        return 'Users'
    }

    @Delete( ':idOrEmailOrUsername' )
    delete( @Param( 'idOrEmailOrUsername' ) idOrEmailOrUsername: string )
    {
        return 'Users'
    }
}