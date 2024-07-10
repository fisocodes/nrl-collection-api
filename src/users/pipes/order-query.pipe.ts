import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { OrderQueryDto } from '../dto/order-query.dto'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class OrderQueryPipe implements PipeTransform
{
    async transform( value?: string )
    {
        if( !value )
            return value

        if( !value.match( /^(\w+:((asc)|(desc)))((,\w+:((asc)|(desc))))*$/g ) )
            throw new BadRequestException( 'Order format is not valid' )

        const orderQuery: any = {}
        const orders: string[] = value.split( ',' )

        for( const order of orders )
        {
            const [ property, , value ]: string[] = order.split( ':' )
            orderQuery[ property ] = value
        }

        const orderQueryInstance = plainToInstance( OrderQueryDto, orderQuery )
        const errors = await validate( orderQueryInstance, {
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