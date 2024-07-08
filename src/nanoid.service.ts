import { Injectable, OnModuleInit } from '@nestjs/common'
import { customAlphabet } from 'nanoid'

@Injectable()
export class NanoIdService implements OnModuleInit
{
    onModuleInit()
    {
        if( !process.env.NANO_ID_ALPHABET )
            throw new Error( 'NANO_ID_ALPHABET does not exists in environment variables' )
    }

    createId(): string
    {
        if( !process.env.NANO_ID_ALPHABET )
            throw new Error( 'NANO_ID_ALPHABET does not exists in environment variables' )

        const nanoId = customAlphabet( process.env.NANO_ID_ALPHABET )
        return nanoId( 10 )
    }
}