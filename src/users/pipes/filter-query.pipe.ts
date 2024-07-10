import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { FilterQueryDto } from '../dto/filter-query.dto'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class FilterQueryPipe implements PipeTransform
{
    async transform( value?: string )
    {
        if( !value )
            return value

        if( !value.match( /^(\w+\.((equals)|(not)|(lt)|(lte)|(gt)|(gte))\.[\w-\:]+)(,(\w+\.((equals)|(not)|(lt)|(lte)|(gt)|(gte))\.[\w-\:]+))*$/g ) )
            throw new BadRequestException( 'Filter format is not valid' )

        const filterQuery: any = {}
        const filters: string[] = value.split( ',' )

        for( const filter of filters )
        {
            const [ property, , value ]: string[] = filter.split( '.' )
            filterQuery[ property ] = value
        }

        const filterQueryInstance = plainToInstance( FilterQueryDto, filterQuery )
        const errors = await validate( filterQueryInstance, {
            whitelist: true,
            forbidNonWhitelisted: true
        } )

        if( errors.length > 0 )
        {
            throw new BadRequestException( ...errors.map( e =>
            {
                if( e.constraints )
                {
                    return Object.values( e.constraints )
                }
            } ) )
        }

        return value
    }
}