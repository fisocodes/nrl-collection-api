import { NanoIdService } from '../nanoid.service'
import { PrismaService } from '../prisma.service'
import { UsersService } from './users.service'
import { mockDeep } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'


function mockUser(): User
{
    return {
        id: faker.string.alphanumeric( 10 ),
        createDate: new Date(),
        updateDate: new Date(),
        role: 'USER',
        email: faker.internet.email(),
        isEmailVerified: false,
        password: faker.string.alphanumeric( 25 ),
        username: faker.internet.userName()
    }
}

describe( 'USERS service', () =>
{
    const prismaServiceMock = mockDeep<PrismaService>()
    const nanoIdServiceMock = mockDeep<NanoIdService>()
    const usersService = new UsersService( prismaServiceMock, nanoIdServiceMock )

    describe( 'Create user function', () =>
    {
        describe( 'when it fails', () =>
        {
            it( 'it should throw error when user already exists', async () =>
            {
                await expect( usersService.create( mockUser() ) ).rejects.toThrow( ConflictException )
            } )
        } )

        describe( 'when it passes', () =>
        {
            it( 'should return the created user', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockResolvedValue( mockUser() )
                prismaServiceMock.user.create.mockResolvedValue( mockUser() )

                await expect( usersService.create( mockUser() ) ).resolves.toBeDefined()
            } )
        } )
    } )

    describe( 'Read one user function', () =>
    {
        describe( 'when it fails', () =>
        {
            it( 'should throw an error when user not found', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockImplementation( () => { throw new Error() } )
                await expect( usersService.readOne( faker.string.alphanumeric( 10 ) ) ).rejects.toThrow( NotFoundException )
            } )
        } )

        describe( 'when it passes', () =>
        {
            it( 'should return an user', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockResolvedValue( mockUser() )
                await expect( usersService.readOne( faker.string.alphanumeric( 10 ) ) ).resolves.toBeDefined()
            } )
        } )
    } )

    describe( 'Read many users function', () =>
    {
        it( 'Should return an array of type users', async () =>
        {
            prismaServiceMock.user.findMany.mockResolvedValue( [] )
            await expect( usersService.readMany( 1, 10, '', '' ) ).resolves.toBeDefined()
        } )
    } )

    describe( 'Update user function', () =>
    {
        describe( 'when it fails', () =>
        {
            it( 'should throw an error when user not found', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockImplementation( () => { throw new Error() } )
                await expect( usersService.update( faker.internet.email(), mockUser() ) ).rejects.toThrow( NotFoundException )
            } )
        } )

        describe( 'when it passes', () =>
        {
            it( 'should return updated user', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockResolvedValue( mockUser() )
                prismaServiceMock.user.update.mockResolvedValue( mockUser() )
                await expect( usersService.update( faker.internet.email(), mockUser() ) ).resolves.toBeDefined()
            } )
        } )
    } )

    describe( 'Update password function', () =>
    {
        describe( 'when it fails', () =>
        {
            it( 'should throw an error when user not found', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockImplementation( () => { throw new Error() } )
                await expect( usersService.updatePassword( faker.internet.email(), faker.string.alphanumeric( 8 ) ) ).rejects.toThrow( NotFoundException )
            } )
        } )

        describe( 'when it passes', () =>
        {
            it( 'should return updated user', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockResolvedValue( mockUser() )
                prismaServiceMock.user.update.mockResolvedValue( mockUser() )
                await expect( usersService.updatePassword( faker.internet.email(), faker.string.alphanumeric( 8 ) ) ).resolves.toBeDefined()
            } )
        } )
    } )

    describe( 'Delete user function', () =>
    {
        describe( 'when it fails', () =>
        {
            it( 'should throw an error when user not found', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockImplementation( () => { throw new Error() } )
                await expect( usersService.delete( faker.internet.email() ) ).rejects.toThrow( NotFoundException )
            } )
        } )

        describe( 'when it passes', () =>
        {
            it( 'should return deleted user', async () =>
            {
                prismaServiceMock.user.findFirstOrThrow.mockResolvedValue( mockUser() )
                prismaServiceMock.user.delete.mockResolvedValue( mockUser() )
                await expect( usersService.delete( faker.internet.email() ) ).resolves.toBeDefined()
            } )
        } )
    } )
} )