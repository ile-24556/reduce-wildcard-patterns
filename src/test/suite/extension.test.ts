import * as assert from 'assert';
import { makeLinesFight } from '../../reduce-patterns';

suite('Extension Test Suite', () => {

    const knownCases = [
        { input: ['a', 'bravo', '*', 'charlie'], expected: ['*'] },
        { input: ['abcde', 'ace', 'a*e'], expected: ['a*e'] },
        { input: ['a', 'b', '?', 'c'], expected: ['?'] },
        { input: ['abcde', 'ace', 'a?e'], expected: ['abcde', 'a?e'] },

        { input: ['aa.bb', 'aa-bb'], expected: ['aa.bb', 'aa-bb'] },

        // Priority between star and question mark
        { input: ['a', 'b', '?', '*', 'd'], expected: ['*'] },
        { input: ['aazbb?cc', 'aa?bb*cc'], expected: ['aa?bb*cc'] },
        // { input: ['aa?bb?cc', 'aa?bb*cc'], expected: ['aa?bb*cc'] },
    ];

    test('Reduce cases', () => {
        for (const pair of knownCases) {
            assert.deepStrictEqual(makeLinesFight(pair.input), pair.expected);
        }
    });
});
