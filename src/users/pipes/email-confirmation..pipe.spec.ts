import { EmailConfirmationPipe } from './email-confirmation.pipe'
import { CreateUserDto } from '../dto/create-user.dto'
import { faker } from '@faker-js/faker'
import { BadRequestException } from '@nestjs/common'

describe( 'USERS email confirmation pipe', () =>
{
    const emailConfirmationPipe = new EmailConfirmationPipe()

    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw an error when email and confirmEmail are different', () =>
            {
                const body: CreateUserDto = {
                    confirmEmail: faker.internet.email(),
                    confirmPassword: faker.internet.password(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    username: faker.internet.userName()
                }

                expect( () => emailConfirmationPipe.transform( body ) ).toThrow( BadRequestException )
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the body unchanged when email and confirmEmail are equal', () =>
            {
                const email = faker.internet.email()

                const body: CreateUserDto = {
                    confirmEmail: email,
                    confirmPassword: faker.internet.password(),
                    email,
                    password: faker.internet.password(),
                    username: faker.internet.userName()
                }

                const returnedBody = emailConfirmationPipe.transform( body )
                expect( returnedBody ).toEqual( body )
            } )
        } )
    } )
} )