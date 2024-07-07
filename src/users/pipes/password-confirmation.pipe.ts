import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class PasswordConfirmationPipe implements PipeTransform
{
    transform( value: CreateUserDto )
    {
        if( value.password !== value.confirmPassword )
            throw new BadRequestException( 'password and confirmPassword do not match' )

        return value
    }
}