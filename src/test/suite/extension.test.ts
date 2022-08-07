import * as assert from 'assert';
import { makeLinesFight } from '../../reduce-patterns';

suite('Extension Test Suite', () => {
    test('Reduce cases', () => {
        assert.deepStrictEqual(makeLinesFight(['a', 'bravo', '*', 'charlie']), '*');
    });
});
