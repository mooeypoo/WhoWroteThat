import { expect } from 'chai';
import Api from '../../src/Api.js';

describe( 'Api test', () => {

	describe( 'getAjaxURL', () => {
		const cases = [
			{
				msg: 'Should get the correct API URL',
				config: {
					wgServerName: 'en.wikipedia.org',
					wgRevisionId: 234,
					wgPageName: 'Iñtërnâtiônàlizætiøn_(disambig)'
				},
				expected: 'https://wikiwho.example.com/en/whocolor/v1.0.0-beta/I%C3%B1t%C3%ABrn%C3%A2ti%C3%B4n%C3%A0liz%C3%A6ti%C3%B8n_(disambig)/234/'
			},
			{
				msg: 'Should only append a revision ID if it is not the current one',
				config: {
					wgServerName: 'cbk-zam.wikipedia.org',
					wgPageName: 'Foo',
					wgRevisionId: 123
				},
				expected: 'https://wikiwho.example.com/cbk-zam/whocolor/v1.0.0-beta/Foo/123/'
			},
			{
				msg: 'Should get the correct API URL with an old revision ID',
				config: {
					wgServerName: 'ru.wikipedia.org',
					wgPageName: 'Foo',
					wgRevisionId: 123,
					wgCurRevisionId: 456
				},
				expected: 'https://wikiwho.example.com/ru/whocolor/v1.0.0-beta/Foo/123/'
			},
			{
				msg: 'Should encode query parameters',
				config: {
					wgServerName: 'en.wikipedia.org',
					wgRevisionId: 123,
					wgPageName: 'Test Works?user-ip=0.0.0.0&'
				},
				expected: 'https://wikiwho.example.com/en/whocolor/v1.0.0-beta/Test%20Works%3Fuser-ip%3D0.0.0.0%26/123/'
			}
		];

		// Run all test cases
		cases.forEach( ( testCase ) => {
			// Dummy version of mw.Map to use as config.
			const config = {
					data: testCase.config,
					/**
					 * Mock an mw.Map getter for use in the config
					 *
					 * @param  {string} key Name of the key to fetch
					 * @return {string|number} Value
					 */
					get: function ( key ) {
						return this.data[ key ];
					}
				},
				a = new Api( { url: 'https://wikiwho.example.com/', mwConfig: config } );
			it( testCase.msg, () => {
				expect( a.getAjaxURL() ).to.equal( testCase.expected );
			} );
		} );
	} );
} );
