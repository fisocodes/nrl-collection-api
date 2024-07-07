import { PasswordConfirmationPipe } from './password-confirmation.pipe'
import { CreateUserDto } from '../dto/create-user.dto'

describe( 'Password confirmation pipe', () =>
{
    const passwordConfirmationPipe = new PasswordConfirmationPipe()

    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw an error when password and confirmPassword are different', () =>
            {
                const body: CreateUserDto = {
                    confirmEmail: 'asdf@asdf.asdf',
                    confirmPassword: 'ABCedf123&',
                    email: 'qwer@qwer.qwer',
                    password: 'ABCedf123#',
                    username: 'user'
                }

                try
                {
                    passwordConfirmationPipe.transform( body )
                } catch( e: any )
                {
                    expect( e.response.message ).toEqual( 'password and confirmPassword do not match' )
                }
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the body unchanged when password and confirmPassword are equal', () =>
            {
                const body: CreateUserDto = {
                    confirmEmail: 'asdf@asdf.asdf',
                    confirmPassword: 'Abc123#!',
                    email: 'asdf@asdf.asdf',
                    password: 'Abc123#!',
                    username: 'userson'
                }

                const returnedBody = passwordConfirmationPipe.transform( body )

                expect( returnedBody ).toEqual( body )
            } )
        } )
    } )
} )