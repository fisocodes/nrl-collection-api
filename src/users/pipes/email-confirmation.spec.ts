import { EmailConfirmationPipe } from './email-confirmation.pipe'
import { CreateUserDto } from '../dto/create-user.dto'

describe( 'Email confirmation pipe', () =>
{
    const emailConfirmationPipe = new EmailConfirmationPipe()

    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw an error when email and confirmEmail are different', () =>
            {
                const body: CreateUserDto = {
                    confirmEmail: 'asdf@asdf.asdf',
                    confirmPassword: 'ABCedf123#',
                    email: 'qwer@qwer.qwer',
                    password: 'ABCedf123#',
                    username: 'user'
                }

                try
                {
                    emailConfirmationPipe.transform( body )
                } catch( e: any )
                {
                    expect( e.response.message ).toEqual( 'email and confirmEmail do not match' )
                }
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the body unchanged when email and confirmEmail are equal', () =>
            {
                const body: CreateUserDto = {
                    confirmEmail: 'asdf@asdf.asdf',
                    confirmPassword: 'Abc123#!',
                    email: 'asdf@asdf.asdf',
                    password: 'Abc123#!',
                    username: 'userson'
                }

                const returnedBody = emailConfirmationPipe.transform( body )

                expect( returnedBody ).toEqual( body )
            } )
        } )
    } )
} )