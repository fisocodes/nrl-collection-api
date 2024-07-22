import { Global, Module } from '@nestjs/common'
import { UsersModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { NanoIdService } from './nanoid.service'
import { NodemailerService } from './nodemailer.service'
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module( {
    imports: [ JwtModule.register( {
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '60s'
        }
    } ), UsersModule, AuthModule ],
    providers: [ PrismaService, NanoIdService, NodemailerService ],
    exports: [ PrismaService, NanoIdService, NodemailerService ]
} )
export class AppModule {}