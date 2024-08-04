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
        const foundUser = await this.prisma.user.findFirst( {
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

        if( !foundUser )
            throw new NotFoundException()

        return foundUser
    }

    async create( data: Prisma.UserCreateInput ): Promise<User>
    {
        if( await this.prisma.user.findFirst( { where: { email: data.email } } ) )
            throw new ConflictException( 'An account with that email already exists' )

        if( await this.prisma.user.findFirst( { where: { username: data.username } } ) )
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

    mapOrders( orders: string ): Prisma.UserOrderByWithAggregationInput[]
    {
        return orders.split( ',' ).map( order =>
        {
            const [ property, direction ] = order.split( ':' ) as [ Prisma.UserScalarFieldEnum, Prisma.SortOrder ]
            return { [ property ]: direction }
        } )
    }

    mapFilters( filters?: string ): Prisma.UserWhereInput
    {
        return filters?.split( ',' ).reduce( ( whereAccumulator: any, filter: string ) =>
        {
            const [ property, operator, value ] = filter.split( '.' ) as [ Prisma.UserScalarFieldEnum, 'equals' | 'not' | 'lt' | 'lte' | 'gt' | 'gte', string | number ]

            if( !whereAccumulator[ property ] )
                whereAccumulator[ property ] = {}

            whereAccumulator[ property ][ operator ] = Number.isNaN( value ) ? value : Number( value )

            return whereAccumulator
        }, {} )
    }

    async readMany( page: number, perPage: number, orders: string, filters: string | undefined ): Promise<User[]>
    {
        return await this.prisma.user.findMany( {
            take: perPage,
            skip: ( page - 1 ) * perPage,
            orderBy: this.mapOrders( orders ),
            where: this.mapFilters( filters )
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