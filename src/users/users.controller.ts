import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { PasswordConfirmationPipe } from './pipes/password-confirmation.pipe'
import { EmailConfirmationPipe } from './pipes/email-confirmation.pipe'
import { FilterQueryPipe } from './pipes/filter-query.pipe'
import { OrderQueryPipe } from './pipes/order-query.pipe'
import { NodemailerService } from '../nodemailer.service'

@ApiTags( 'users' )
@Controller( 'users' )
export class UsersController
{
    constructor( private usersService: UsersService, private nodemailerService: NodemailerService ) {}

    @Post()
    async create(
        @Body( new EmailConfirmationPipe(), new PasswordConfirmationPipe() ) createUserDto: CreateUserDto
    )
    {
        this.nodemailerService.transporter.sendMail( {
            from: 'NRL COLLECTION',
            to: createUserDto.email,
            subject: 'NRL Collection email confirmation',
            html: `
                <p> Thank you for signin up on NRL Collection</p>
                <p>In order to use the API you need to confirm your email</p>
                <p>Click in the link below to confirm your email</p>
                <p>If you did not sign up to NRL Collection you can just ignore this email</p>
            `
        } )
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