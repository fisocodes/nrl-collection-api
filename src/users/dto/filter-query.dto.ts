import { User } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator'

export class FilterQueryDto implements Omit<User, 'id' | 'password'>
{
    @IsDate( { message: 'createDate is not valid' } )
    @Type( () => Date )
    @IsOptional()
    createDate: Date

    @IsDate( { message: 'modifiedDate is not valid' } )
    @Type( () => Date )
    @IsOptional()
    modifiedDate: Date

    @IsString()
    @IsOptional()
    role: string

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    username: string
}