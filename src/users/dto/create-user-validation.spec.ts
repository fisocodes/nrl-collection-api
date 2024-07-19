import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './create-user.dto'
import { faker } from '@faker-js/faker'

describe( 'Validation pipe for CreateUserDto', () =>
{
    const createUserValidationPipe = new ValidationPipe( { forbidNonWhitelisted: true } )

    const metadata: ArgumentMetadata = {
        type: 'body',
        data: '',
        metatype: CreateUserDto
    }

    const allErros: string[] = [
        'email should not be empty',
        'email must be a string',
        'email must be an email',
        'confirmEmail should not be empty',
        'confirmEmail must be a string',
        'confirmEmail must be an email',
        'username should not be empty',
        'username must be a string',
        'password should not be empty',
        'password must be a string',
        'password must be longer than or equal to 8 characters',
        'password must contain at least one special character',
        'confirmPassword should not be empty',
        'confirmPassword must be a string',
        'confirmPassword must be longer than or equal to 8 characters',
        'password must contain at least one special character'
    ]

    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw all errors when body is undefined', async () =>
            {
                try
                {
                    await createUserValidationPipe.transform( undefined, metadata )
                } catch( e: any )
                {
                    expect( e.response.message ).toEqual( allErros )
                }
            } )

            it( 'should throw all errors when body is null', async () =>
            {
                try
                {
                    await createUserValidationPipe.transform( null, metadata )
                } catch( e: any )
                {
                    expect( e.response.message ).toEqual( allErros )
                }
            } )

            it( 'should throw all errors when body is empty', async () =>
            {
                try
                {
                    await createUserValidationPipe.transform( {}, metadata )
                } catch( e: any )
                {
                    expect( e.response.message ).toEqual( allErros )
                }
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the body unchanged when it is valid', async () =>
            {
                const email = faker.internet.email()
                const password = faker.internet.password( { length: 8 } ) + "#$%&"

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