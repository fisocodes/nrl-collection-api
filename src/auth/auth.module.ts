import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/user.module'
import { AuthService } from './auth.service'

@Module( {
    imports: [ UsersModule ],
    controllers: [ AuthController ],
    providers: [ AuthService ]
} )
export class AuthModule {}