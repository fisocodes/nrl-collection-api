import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class IdValidationPipe implements PipeTransform
{
    transform( value: string )
    {
        if( !value.match( /^[A-Z0-9]{10}$/ ) )
            throw new BadRequestException( 'id format is invalid' )

        return value
    }
}