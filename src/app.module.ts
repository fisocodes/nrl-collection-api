import { Global, Module } from '@nestjs/common'
import { UsersModule } from './users/user.module'
import { PrismaService } from './prisma.service'
import { NanoIdService } from './nanoid.service'
import { NodemailerService } from './nodemailer.service'

@Global()
@Module( {
    imports: [ UsersModule ],
    providers: [ PrismaService, NanoIdService, NodemailerService ],
    exports: [ PrismaService, NanoIdService, NodemailerService ]
} )
export class AppModule {}