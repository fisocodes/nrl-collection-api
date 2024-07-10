import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { PasswordConfirmationPipe } from './pipes/password-confirmation.pipe'
import { EmailConfirmationPipe } from './pipes/email-confirmation.pipe'
import { FilterQueryPipe } from './pipes/filter-query.pipe'

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
    @ApiQuery( { name: 'filter', required: false } )
    @Get()
    async readMany( @Query( 'filter', new FilterQueryPipe() ) filter?: string )
    {
        return 'Users'
    }

    @Delete( ':idOrEmailOrUsername' )
    delete( @Param( 'idOrEmailOrUsername' ) idOrEmailOrUsername: string )
    {
        return 'Users'
    }
}