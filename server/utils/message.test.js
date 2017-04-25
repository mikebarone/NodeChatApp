const expect = require('expect');
const messages = require('./messages');

var {generateMessage} = require('./messages'); 

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var res = messages.generateMessage('Mike','Hello');

        expect(res.from).toEqual('Mike');
        expect(res.text).toEqual('Hello');
        expect(res.createdAt).toBeA('number');
    });
});