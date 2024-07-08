import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, User } from '@prisma/client'
import { hash } from 'bcrypt'
import { NanoIdService } from '../nanoid.service'

@Injectable()
export class UsersService
{
    constructor( private prisma: PrismaService, private nanoId: NanoIdService ) {}

    async create( data: Prisma.UserCreateInput ): Promise<User>
    {
        const foundUserByEmail = await this.prisma.user.findFirst( {
            where: {
                email: { equals: data.email }
            }
        } )

        if( foundUserByEmail )
            throw new ConflictException( 'An account with that email already exists' )

        const foundUserByUsername = await this.prisma.user.findFirst( {
            where: {
                username: { equals: data.username }
            }
        } )

        if( foundUserByUsername )
            throw new ConflictException( 'Username already taken' )

        return await this.prisma.user.create( {
            data: {
                ...data,
                id: this.nanoId.createId(),
                password: await hash( data.password, 12 )
            }
        } )
    }

    async readOne( idOrEmailOrUsername: string ): Promise<User>
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

    //TODO Implement this method
    async readMany( args: Prisma.UserFindManyArgs ): Promise<User[]>
    {
        return await this.prisma.user.findMany( args )
    }

    async update( idOrEmailOrUsername: string, data: Prisma.UserUpdateInput ): Promise<User>
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

        return await this.prisma.user.update( {
            where: {
                id: foundUser.id
            },
            data
        } )
    }

    async delete( idOrEmailOrUsername: string ): Promise<User>
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

        return await this.prisma.user.delete( {
            where: {
                id: foundUser.id
            }
        } )
    }
}