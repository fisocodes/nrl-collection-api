import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './create-user.dto'
import { faker } from '@faker-js/faker'

describe( 'USERS create user dto', () =>
{
    const createUserValidationPipe = new ValidationPipe( { forbidNonWhitelisted: true } )

    const metadata: ArgumentMetadata = {
        type: 'body',
        data: '',
        metatype: CreateUserDto
    }

    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw an error when body is undefined', async () =>
            {
                await expect( createUserValidationPipe.transform( undefined, metadata ) ).rejects.toThrow( BadRequestException )
            } )

            it( 'should throw an error when body is null', async () =>
            {
                await expect( createUserValidationPipe.transform( null, metadata ) ).rejects.toThrow( BadRequestException )
            } )

            it( 'should throw an error when body is empty', async () =>
            {
                await expect( createUserValidationPipe.transform( {}, metadata ) ).rejects.toThrow( BadRequestException )
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the body unchanged when it is valid', async () =>
            {
                const email = faker.internet.email()
                const password = faker.internet.password( { length: 8, prefix: 'Az1#$%&' } )

                const body: CreateUserDto = {
                    confirmEmail: email,
                    confirmPassword: password,
                    email,
                    password,
                    username: faker.internet.userName()
                }

                const returnedBody = await createUserValidationPipe.transform( body, metadata )
                expect( returnedBody ).toEqual( body )
            } )
        } )
    } )
} )