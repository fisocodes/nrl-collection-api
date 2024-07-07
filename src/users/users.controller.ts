import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
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
    create( @Body( new EmailConfirmationPipe(), new PasswordConfirmationPipe() ) createUserDto: CreateUserDto )
    {
        return { id: 'asdf', ...createUserDto }
    }

    @Get()
    readOne()
    {
        return 'Users'
    }

    @Get()
    readMany()
    {
        return 'Users'
    }

    @Patch()
    update()
    {
        return 'Users'
    }

    @Delete()
    delete()
    {

    }
}