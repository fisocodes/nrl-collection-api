import { User } from '@prisma/client'
import { IsOptional } from 'class-validator'

export class OrderQueryDto implements Omit<User, 'id' | 'password' | 'isEmailVerified'>
{
    @IsOptional()
    createDate: Date

    @IsOptional()
    updateDate: Date

    @IsOptional()
    role: string

    @IsOptional()
    email: string

    @IsOptional()
    username: string
}

// @ApiPropertyOptional()
// @Matches( /^(\w+:((asc)|(desc)))((,\w+:((asc)|(desc))))*$/g )
// @IsString()
// @IsOptional()
// order: string | undefined