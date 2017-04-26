const expect = require('expect');

var {isRealString} = require('./validation'); 

describe('isRealString', () => {
    it('should be a real string', () => {
        expect(isRealString('Mike')).toBe(true);
        expect(isRealString('   ')).toBe(false);
        expect(isRealString(1)).toBe(false);
    });
});