import { PasswordConfirmationPipe } from './password-confirmation.pipe'
import { CreateUserDto } from '../dto/create-user.dto'
import { faker } from '@faker-js/faker'
import { BadRequestException } from '@nestjs/common'

describe( 'USERS password confirmation pipe', () =>
{
    const passwordConfirmationPipe = new PasswordConfirmationPipe()

    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw an error when password and confirmPassword are different', () =>
            {
                const body: CreateUserDto = {
                    confirmEmail: faker.internet.email(),
                    confirmPassword: faker.internet.password( { length: 8 } ) + "#$%&",
                    email: faker.internet.email(),
                    password: faker.internet.password( { length: 8 } ) + "#$%&",
                    username: faker.internet.userName()
                }

                expect( () => passwordConfirmationPipe.transform( body ) ).toThrow( BadRequestException )
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the body unchanged when password and confirmPassword are equal', () =>
            {
                const password = faker.internet.password( { length: 8 } ) + "#$%&"

                const body: CreateUserDto = {
                    confirmEmail: faker.internet.email(),
                    confirmPassword: password,
                    email: faker.internet.email(),
                    password,
                    username: faker.internet.userName()
                }

                const returnedBody = passwordConfirmationPipe.transform( body )
                expect( returnedBody ).toEqual( body )
            } )
        } )
    } )
} )