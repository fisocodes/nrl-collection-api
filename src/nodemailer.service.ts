import { Injectable, OnModuleInit } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

@Injectable()
export class NodemailerService implements OnModuleInit
{
    transporter: Transporter

    onModuleInit()
    {
        if( process.env.SMTP_HOST === undefined )
            throw new Error( 'SMPT host is undefined. SMTP_HOST should exist in environment variables' )

        if( process.env.SMTP_PORT === undefined )
            throw new Error( 'SMPT port is undefined. SMTP_PORT should exist in environment variables' )

        if( process.env.SMTP_USER === undefined )
            throw new Error( 'SMPT user is undefined. SMTP_USER should exist in environment variables' )

        if( process.env.SMTP_PASS === undefined )
            throw new Error( 'SMPT password is undefined. SMTP_PASS should exist in environment variables' )

        const transportOptions: SMTPTransport.Options = {
            host: process.env.SMTP_HOST,
            port: parseInt( process.env.SMTP_PORT ),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        }
        this.transporter = createTransport( transportOptions )
    }
}