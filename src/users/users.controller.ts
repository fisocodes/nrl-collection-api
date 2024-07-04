import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserValidationPipe } from './dto/create-user-validation.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags( 'users' )
@Controller( 'users' )
export class UsersController
{
    constructor( private usersService: UsersService ) {}

    @Post()
    create( @Body( new CreateUserValidationPipe() ) createUserDto: CreateUserDto )
    {
        return 'Users'
    }

    @Get()
    getOne()
    {
        return 'Users'
    }

    @Get()
    getMany()
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