import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { PasswordConfirmationPipe } from './pipes/password-confirmation.pipe'
import { EmailConfirmationPipe } from './pipes/email-confirmation.pipe'
import { FilterQueryPipe } from './pipes/filter-query.pipe'
import { OrderQueryPipe } from './pipes/order-query.pipe'

@ApiTags( 'users' )
@Controller( 'users' )
export class UsersController
{
    constructor( private usersService: UsersService ) {}

    @Post()
    async create(
        @Body( new EmailConfirmationPipe(), new PasswordConfirmationPipe() ) createUserDto: CreateUserDto
    )
    {
        return 'Users'
    }

    @Get( ':idOrEmailOrUsername' )
    readOne(
        @Param( 'idOrEmailOrUsername' ) idOrEmailOrUsername: string
    )
    {
        return 'Users'
    }

    @ApiQuery( { name: 'filter', required: false } )
    @ApiQuery( { name: 'order', required: false } )
    @ApiQuery( { name: 'page', required: false } )
    @ApiQuery( { name: 'perPage', required: false } )
    @Get()
    async readMany(
        @Query( 'page', new DefaultValuePipe( 1 ), new ParseIntPipe() ) page: number,
        @Query( 'perPage', new DefaultValuePipe( 10 ), new ParseIntPipe() ) perPage: number,
        @Query( 'filter', new DefaultValuePipe( '' ), new FilterQueryPipe() ) filter: string,
        @Query( 'order', new DefaultValuePipe( 'createDate:desc' ), new OrderQueryPipe() ) order: string
    )
    {
        return 'Users'
    }

    @Delete( ':idOrEmailOrUsername' )
    delete(
        @Param( 'idOrEmailOrUsername' ) idOrEmailOrUsername: string
    )
    {
        return 'Users'
    }
}