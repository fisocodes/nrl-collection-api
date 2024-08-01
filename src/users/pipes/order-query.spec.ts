import { BadRequestException } from '@nestjs/common'
import { OrderQueryPipe } from './order-query.pipe'

describe( 'USERS order query pipe', () =>
{
    const orderQueryPipe = new OrderQueryPipe()

    describe( 'when validation fails', () =>
    {
        it( 'should throw and error when string does not match the regex expression', async () =>
        {
            await expect( orderQueryPipe.transform( 'this string should fail' ) ).rejects.toThrow( BadRequestException )
        } )

        it( 'should throw and error when string does not contain a valid property', async () =>
        {
            await expect( orderQueryPipe.transform( 'invalidProperty:asc' ) ).rejects.toThrow( BadRequestException )
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