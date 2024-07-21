import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { PasswordConfirmationPipe } from './pipes/password-confirmation.pipe'
import { EmailConfirmationPipe } from './pipes/email-confirmation.pipe'
import { FilterQueryPipe } from './pipes/filter-query.pipe'
import { OrderQueryPipe } from './pipes/order-query.pipe'
import { NodemailerService } from '../nodemailer.service'
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@ApiTags( 'users' )
@Controller( 'users' )
export class UsersController
{
    constructor( private usersService: UsersService, private jwtService: JwtService, private nodemailerService: NodemailerService ) {}

    @Post()
    async create(
        @Body( new EmailConfirmationPipe(), new PasswordConfirmationPipe() ) createUserDto: CreateUserDto
    ): Promise<User>
    {
        const createdUser: User = await this.usersService.create( {
            email: createUserDto.email,
            password: await hash( createUserDto.password, 12 ),
            username: createUserDto.username
        } )

        const emailVerificationToken = await this.jwtService.signAsync( { sub: createdUser.id } )

        await this.nodemailerService.sendVerificationEmail( createdUser.email, emailVerificationToken )

        return createdUser
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