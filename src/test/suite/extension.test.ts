import * as assert from 'assert';
import { makeLinesFight } from '../../reduce-patterns';

suite('Extension Test Suite', () => {

    const knownCases = [
        { input: ['a', 'bravo', '*', 'charlie'], expected: ['*'] },
        { input: ['abcde', 'ace', 'a*e'], expected: ['a*e'] },
        { input: ['a', 'b', '?', 'c'], expected: ['?'] },
        { input: ['abcde', 'ace', 'a?e'], expected: ['abcde', 'a?e'] },

        // Escaping special characters
        { input: ['a.b', 'a-b'], expected: ['a.b', 'a-b'] },

        // Precedence between star and question mark
        { input: ['a', 'b', '?', '*', 'd'], expected: ['*'] },
        { input: ['azb?c', 'a?b*c'], expected: ['a?b*c'] },
        { input: ['a?b?c', 'a?b*c'], expected: ['a?b*c'] },
        // Does not decide
        { input: ['a*b?c', 'a?b*c'], expected: ['a*b?c', 'a?b*c'] },
    ];

    test('Reduce cases', () => {
        for (const pair of knownCases) {
            assert.deepStrictEqual(makeLinesFight(pair.input), pair.expected);
        }
    });
});
