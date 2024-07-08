import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsPositive, IsString, Matches } from 'class-validator'

export class QueryUserDto
{
    @ApiPropertyOptional()
    @IsPositive()
    @IsInt()
    @Type( () => Number )
    @IsOptional()
    page: number | undefined

    @ApiPropertyOptional()
    @IsPositive()
    @IsInt()
    @Type( () => Number )
    @IsOptional()
    perPage: number | undefined

    @ApiPropertyOptional()
    @Matches( /^(\w+:((asc)|(desc)))((,\w+:((asc)|(desc))))*$/g )
    @IsString()
    @IsOptional()
    order: string | undefined

    @ApiPropertyOptional()
    @Matches( /^(\w+\.((equals)|(not)|(lt)|(lte)|(gt)|(gte))\.[\w-\:]+)(,(\w+\.((equals)|(not)|(lt)|(lte)|(gt)|(gte))\.[\w-\:]+))*$/g )
    @IsString()
    @IsOptional()
    filter: string | undefined
}