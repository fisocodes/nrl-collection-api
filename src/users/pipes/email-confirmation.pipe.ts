import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class EmailConfirmationPipe implements PipeTransform
{
    transform( value: CreateUserDto )
    {
        if( value.email !== value.confirmEmail )
            throw new BadRequestException( 'email and confirmEmail do not match' )

        return value
    }
}