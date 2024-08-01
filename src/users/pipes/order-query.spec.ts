import { BadRequestException } from '@nestjs/common'
import { OrderQueryPipe } from './order-query.pipe'

describe( 'User order query', () =>
{
    const orderQueryPipe = new OrderQueryPipe()

    describe( 'when validation fails', () =>
    {
        it( 'should throw and error when string does not match the regex expression', async () =>
        {
            try
            {
                await orderQueryPipe.transform( 'this string should fail' )
            } catch( e )
            {
                expect( e ).toBeInstanceOf( BadRequestException )
            }
        } )

        it( 'should throw and error when string does not contain a valid property', async () =>
        {
            try
            {
                await orderQueryPipe.transform( 'invalidProperty:asc' )
            } catch( e )
            {
                expect( e ).toBeInstanceOf( BadRequestException )
            }
        } )
    } )

    describe( 'when validation passes', () =>
    {
        it( 'should return the same value when order is undefined', async () =>
        {
            const returnedValue = await orderQueryPipe.transform()

            expect( returnedValue ).toEqual( undefined )
        } )

        it( 'should return the same value when order is an empty string', async () =>
        {
            const returnedValue = await orderQueryPipe.transform( '' )

            expect( returnedValue ).toEqual( '' )
        } )

        it( 'should return the same value when order matches the regex expression', async () =>
        {
            const order = 'username:desc'
            const returnedValue = await orderQueryPipe.transform( order )

            expect( returnedValue ).toEqual( order )
        } )
    } )
} )