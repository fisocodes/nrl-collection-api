import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/user.module'

@Module( {
    imports: [ UsersModule ],
    controllers: [ AuthController ]
} )
export class AuthModule {}