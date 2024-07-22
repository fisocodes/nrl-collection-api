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

    async sendVerificationEmail( to: string, emailVerificationToken: string )
    {
        await this.transporter.sendMail( {
            from: 'NRL Collection API',
            to,
            subject: 'Email verification',
            html: `
            <style>
                header {
                    padding: 1.5rem;
                    background-color: limegreen;
                    font-size: larger;
                    color: white;
                }

                section {
                    padding: 1.5rem;
                }

                footer {
                    padding: 1.5rem;
                    background-color: limegreen;
                    font-size: larger;
                    color: white;
                    display: flex;
                    justify-content: center;
                }
            </style>
            <header>NRL Collection API</header>
            <section>Welcome to NRL Collection API!</section>
            <section>
                In order to use the API you need to verify your account. Click the
                link below to verify your account.
            </section>
            <section>
                <a href="${process.env.API_URL}/auth/verify-email?emailVerificationToken=${emailVerificationToken}"
                    >Verify your NRL Collection account</a
                >
            </section>
            <section>
                You can safely ignore this email if you did not create an account on
                NRL Collection.
            </section>
            <footer>NRL Collection</footer>`
        } )
    }
}