import { Global, Module } from '@nestjs/common'
import { UsersModule } from './users/user.module'
import { PrismaService } from './prisma.service'
import { NanoIdService } from './nanoid.service'

@Global()
@Module( {
    imports: [ UsersModule ],
    providers: [ PrismaService, NanoIdService ],
    exports: [ PrismaService, NanoIdService ]
} )
export class AppModule {}