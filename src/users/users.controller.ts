import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { PasswordConfirmationPipe } from './pipes/password-confirmation.pipe'
import { EmailConfirmationPipe } from './pipes/email-confirmation.pipe'
import { QueryUserDto } from './dto/query-user.dto'

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

    //TODO Implement implement pipes to validate queries
    @Get()
    async readMany( @Query() { filter, order, page, perPage }: QueryUserDto )
    {
        return await this.usersService.readMany( page, perPage, order, filter )
    }

    @Delete( ':idOrEmailOrUsername' )
    delete( @Param( 'idOrEmailOrUsername' ) idOrEmailOrUsername: string )
    {
        return 'Users'
    }
}