import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, User } from '@prisma/client'
import { hash } from 'bcrypt'
import { NanoIdService } from '../nanoid.service'

@Injectable()
export class UsersService
{
    constructor( private prisma: PrismaService, private nanoId: NanoIdService ) {}

    async findUser( idOrEmailOrUsername: string ): Promise<User>
    {
        try
        {
            const foundUser = await this.prisma.user.findFirstOrThrow( {
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

            return foundUser
        } catch( e )
        {
            throw new NotFoundException()
        }
    }


    async create( data: Prisma.UserCreateInput ): Promise<User>
    {
        if( !await this.findUser( data.email ) )
            throw new ConflictException( 'An account with that email already exists' )

        if( !await this.findUser( data.username ) )
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
        return await this.findUser( idOrEmailOrUsername )
    }


    async readMany( page: number, perPage: number, order: string, filter: string | undefined ): Promise<User[]>
    {
        const orderBy = order.split( ',' ).map( str =>
        {
            const [ property, order ] = str.split( ':' )
            return { [ property ]: order }
        } )

        const where = filter?.split( ',' ).reduce( ( whereAccumulator: any, filter: string ) =>
        {
            const [ property, operator, value ] = filter.split( '.' )

            if( !whereAccumulator[ property ] )
                whereAccumulator[ property ] = {}

            whereAccumulator[ property ][ operator ] = value

            return whereAccumulator
        }, {} )

        return await this.prisma.user.findMany( {
            take: perPage,
            skip: ( page - 1 ) * perPage,
            orderBy,
            where
        } )
    }

    async update( idOrEmailOrUsername: string, data: Prisma.UserUpdateInput ): Promise<User>
    {
        const foundUser = await this.findUser( idOrEmailOrUsername )

        return await this.prisma.user.update( {
            where: {
                id: foundUser.id
            },
            data
        } )
    }

    async updatePassword( idOrEmailOrUsername: string, password: string ): Promise<User>
    {
        const foundUser = await this.findUser( idOrEmailOrUsername )

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
        const foundUser = await this.findUser( idOrEmailOrUsername )

        return await this.prisma.user.delete( {
            where: {
                id: foundUser.id
            }
        } )
    }
}