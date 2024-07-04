import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateUserDto } from './create-user.dto'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class CreateUserValidationPipe implements PipeTransform
{
    async transform( value: any )
    {
        const userDto = plainToInstance( CreateUserDto, value )
        const errors = await validate( userDto )

        if( errors.length > 0 )
        {
            console.log( errors )
            if( errors[ 0 ].constraints )
                throw new BadRequestException( Object.values( errors[ 0 ].constraints )[ 0 ] )
            else
                throw new BadRequestException( 'Validation error' )
        }

        return value
    }
}