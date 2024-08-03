import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, User } from '@prisma/client'
import { hash } from 'bcrypt'
import { NanoIdService } from '../nanoid.service'

@Injectable()
export class UsersService
{
    constructor( private prisma: PrismaService, private nanoId: NanoIdService ) {}

    async findUserByIdOrEmailOrUsername( idOrEmailOrUsername: string ): Promise<User | null>
    {
        return await this.prisma.user.findFirst( {
            where: {
                OR: [
                    {
                        id: { equals: idOrEmailOrUsername }
                    },
                    {
                        email: { equals: idOrEmailOrUsername }
                    },
                    {
                        username: { equals: idOrEmailOrUsername }
                    }
                ]
            }
        } )
    }

    async create( data: Prisma.UserCreateInput ): Promise<User>
    {
        if( await this.findUserByIdOrEmailOrUsername( data.email ) )
            throw new ConflictException( 'An account with that email already exists' )

        if( await this.findUserByIdOrEmailOrUsername( data.username ) )
            throw new ConflictException( 'Username already taken' )

        return await this.prisma.user.create( {
            data: {
                ...data,
                id: this.nanoId.createId(),
                password: await hash( data.password, 10 )
            }
        } )
    }

    async readOne( idOrEmailOrUsername: string ): Promise<User>
    {
        const foundUser = await this.findUserByIdOrEmailOrUsername( idOrEmailOrUsername )

        if( !foundUser )
            throw new NotFoundException()

        return foundUser
    }


    async readMany( page: number, perPage: number, order: string, filter: string | undefined ): Promise<User[]>
    {
        const orderBy = order.split( ',' ).map( str =>
        {
            return { [ str.split( ':' )[ 0 ] ]: str.split( ':' )[ 1 ] }
        } )

        const where = filter?.split( ',' ).reduce( ( acc: any, current: string ) =>
        {
            if( !acc[ current.split( '.' )[ 0 ] ] )
            {
                acc[ current.split( '.' )[ 0 ] ] = {}
            }

            acc[ current.split( '.' )[ 0 ] ][ current.split( '.' )[ 1 ] ] = current.split( '.' )[ 2 ]
            return acc
        }, {} )

        console.log( orderBy, where )

        return await this.prisma.user.findMany( {
            take: perPage,
            skip: ( page - 1 ) * perPage,
            orderBy,
            where
        } )
    }

    async update( idOrEmailOrUsername: string, data: Prisma.UserUpdateInput ): Promise<User>
    {
        const foundUser = await this.findUserByIdOrEmailOrUsername( idOrEmailOrUsername )

        if( !foundUser )
            throw new NotFoundException()

        return await this.prisma.user.update( {
            where: {
                id: foundUser.id
            },
            data
        } )
    }

    async updatePassword( idOrEmailOrUsername: string, password: string ): Promise<User>
    {
        const foundUser = await this.findUserByIdOrEmailOrUsername( idOrEmailOrUsername )

        if( !foundUser )
            throw new NotFoundException()

        return await this.prisma.user.update( {
            where: {
                id: foundUser.id
            },
            data: {
                password: await hash( password, 10 )
            }
        } )
    }

    async delete( idOrEmailOrUsername: string ): Promise<User>
    {
        const foundUser = await this.findUserByIdOrEmailOrUsername( idOrEmailOrUsername )

        if( !foundUser )
            throw new NotFoundException()

        return await this.prisma.user.delete( {
            where: {
                id: foundUser.id
            }
        } )
    }
}