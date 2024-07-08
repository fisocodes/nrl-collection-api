import { IdValidationPipe } from './id-validation.pipe'

describe( 'Id validation pipe', () =>
{
    const idValidationPipe = new IdValidationPipe()

    describe( 'transform', () =>
    {
        describe( 'when validation fails', () =>
        {
            it( 'should throw an error when id format is not valid', () =>
            {
                const id: string = 'asdf123'

                try
                {
                    idValidationPipe.transform( id )
                } catch( e: any )
                {
                    expect( e.response.message ).toEqual( 'id format is invalid' )
                }
            } )
        } )

        describe( 'when validation passes', () =>
        {
            it( 'should return the id unchanged when format is valid', () =>
            {
                const id: string = 'ABCDE12345'

                const returnedId = idValidationPipe.transform( id )

                expect( returnedId ).toEqual( id )
            } )
        } )
    } )
} )