import { BadRequestException } from '@nestjs/common'
import { FilterQueryPipe } from './filter-query.pipe'

describe( 'USERS filter query pipe', () =>
{
    const filterQueryPipe = new FilterQueryPipe()
    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw an error when string does not match the regex expression', async () =>
            {
                await expect( filterQueryPipe.transform( 'this string should throw an error' ) ).rejects.toThrow( BadRequestException )
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the same value when filter is undefined', async () =>
            {
                const returnedValue = await filterQueryPipe.transform()
                expect( returnedValue ).toEqual( undefined )
            } )

            it( 'should return the same value when filter is an empty string', async () =>
            {
                const returnedValue = await filterQueryPipe.transform( '' )
                expect( returnedValue ).toEqual( '' )
            } )

            it( 'should return the same value when filter matches the regex expression', async () =>
            {
                const filter = 'username.equals.something'
                const returnedValue = await filterQueryPipe.transform( filter )
                expect( returnedValue ).toEqual( filter )
            } )
        } )
    } )
} )