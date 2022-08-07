import * as assert from 'assert';
import { makeLinesFight } from '../../reduce-patterns';

suite('Extension Test Suite', () => {

    const knownCases = [
        { input: ['a', 'bravo', '*', 'charlie'], expected: ['*'] }
    ];

    test('Reduce cases', () => {
        for (let pair of knownCases) {
            assert.deepStrictEqual(makeLinesFight(pair.input), pair.expected);
        }
    });
});
