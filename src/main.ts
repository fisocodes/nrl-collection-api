import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap()
{
    const app = await NestFactory.create( AppModule )
    app.useGlobalPipes( new ValidationPipe( { forbidNonWhitelisted: true } ) )

    const config = new DocumentBuilder()
        .setTitle( 'NRL Collection API' )
        .setDescription( 'Data about NRL clubs, players and games' )
        .setVersion( '0.1.0' )
        .addTag( 'users' )
        .build()

    const document = SwaggerModule.createDocument( app, config )
    SwaggerModule.setup( 'api', app, document )

    await app.listen( 3000 )
}

bootstrap()